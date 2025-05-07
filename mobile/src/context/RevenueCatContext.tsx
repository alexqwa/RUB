import { Platform } from 'react-native';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import Purchases, {
  LOG_LEVEL,
  PurchasesPackage,
  CustomerInfo,
} from 'react-native-purchases';

const API_KEYS = {
  apple: '',
  google: 'goog_LcxnwghkFhDZEUWxXqtPTllnJdG',
};

interface User {
  items: string[];
  pro: boolean;
}

interface RevenueCatContextType {
  user: User;
  packages: PurchasesPackage[];
  activeSubscriptions: string[];
  purchasePackage: (pack: PurchasesPackage) => Promise<void>;
  restorePurchasesUser?: () => Promise<CustomerInfo>;
  loading: boolean;
}

const RevenueCatContext = createContext<RevenueCatContextType | null>(null);

export const RevenueCatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>({
    items: [],
    pro: false,
  });
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);
  const [activeSubscriptions, setActiveSubscriptions] = useState<string[]>([]);

  useEffect(() => {
    async function Init() {
      if (Platform.OS === 'android') {
        Purchases.configure({ apiKey: API_KEYS.google });
      } else if (Platform.OS === 'ios') {
        Purchases.configure({ apiKey: API_KEYS.apple });
      }

      Purchases.setLogLevel(LOG_LEVEL.DEBUG);
      Purchases.addCustomerInfoUpdateListener(async (info) => {
        updateCustomerInfo(info);
      });

      await loadOfferings();

      const customer = await Purchases.restorePurchases();
      const activeSubscriptionsFromCustomer = customer.activeSubscriptions;
      console.log('Assinaturas ativas: ', activeSubscriptionsFromCustomer);

      const newUser: User = { items: [], pro: false };
      if (activeSubscriptionsFromCustomer.length > 0) {
        newUser.items.push(...activeSubscriptionsFromCustomer);
        newUser.pro = true;
        setActiveSubscriptions(activeSubscriptionsFromCustomer);
      } else {
        setActiveSubscriptions([]);
      }

      setUser(newUser);
    }

    Init();
  }, []);

  async function loadOfferings() {
    try {
      const offerings = await Purchases.getOfferings();

      if (offerings.current) {
        setPackages(offerings.current.availablePackages);
      }
      setLoading(false);
    } catch (error) {
      console.log('Erro ao carregar ofertas: ', error);
    }
  }

  async function updateCustomerInfo(customerInfo: CustomerInfo) {
    const newUser: User = { items: [], pro: false };

    const activeEntitlements = customerInfo?.entitlements.active;

    if (activeEntitlements && typeof activeEntitlements === 'object') {
      const activeSubscriptionIdentifiers: string[] = [];

      Object.values(activeEntitlements).forEach((entitlement) => {
        if (entitlement) {
          newUser.items.push(entitlement.identifier);
          activeSubscriptionIdentifiers.push(entitlement.identifier);
          newUser.pro = true;
        }
      });

      setActiveSubscriptions(activeSubscriptionIdentifiers);
    } else {
      setActiveSubscriptions([]);
    }
    setUser(newUser);
  }

  async function purchasePackage(pack: PurchasesPackage) {
    try {
      const purchaseResult = await Purchases.purchasePackage(pack);

      // Atualiza o estado do usuário para adicionar a nova assinatura
      setUser((prevUser) => {
        const newItems = prevUser.items.includes(pack.product.identifier)
          ? prevUser.items // Mantém os itens se já existir
          : [...prevUser.items, pack.product.identifier]; // Adiciona nova assinatura

        return {
          ...prevUser,
          items: newItems,
          pro: newItems.length > 0, // Define a propriedade pro com base nas assinaturas
        };
      });

      setActiveSubscriptions((prevSubscriptions) => {
        return prevSubscriptions.includes(pack.product.identifier)
          ? prevSubscriptions // Mantém se já existir
          : [...prevSubscriptions, pack.product.identifier]; // Adiciona nova assinatura
      });
    } catch (err: any) {
      if (err.userCancelled) {
        console.log('Compra cancelada pelo usuário.');
      } else {
        console.error('Erro na compra: ', err);
        alert('Ocorreu um erro ao processar sua compra. Tente novamente.');
      }
    }
  }

  async function restorePurchasesUser() {
    const customer = await Purchases.restorePurchases();
    console.log('Restaurar compra: ', customer);

    return customer;
  }

  const value = {
    user,
    packages,
    purchasePackage,
    restorePurchasesUser,
    activeSubscriptions,
    loading,
  };

  return (
    <RevenueCatContext.Provider value={value}>
      {children}
    </RevenueCatContext.Provider>
  );
};

export const useRevenueCat = () => {
  return useContext(RevenueCatContext) as RevenueCatContextType;
};

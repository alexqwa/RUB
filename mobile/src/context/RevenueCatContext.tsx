import { Platform, View, Text } from 'react-native';
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
      const activeSubscription = customer.activeSubscriptions;
      console.log('Assinaturas ativas: ', activeSubscription);

      const newUser: User = { items: [], pro: false };
      if (activeSubscription.length > 0) {
        newUser.items.push(...activeSubscription);
        newUser.pro = true;
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
    } catch (error) {
      console.log('Erro ao carregar ofertas: ', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateCustomerInfo(customerInfo: CustomerInfo) {
    const newUser: User = { items: [], pro: false };
    console.log('Informações do usuário: ', customerInfo?.entitlements.active);

    const activeEntitlements = customerInfo?.entitlements.active;

    for (const entitlement in activeEntitlements) {
      if (activeEntitlements[entitlement]) {
        newUser.items.push(activeEntitlements[entitlement].identifier);
        newUser.pro = true;
      }
    }

    setUser(newUser);
  }

  async function purchasePackage(pack: PurchasesPackage) {
    try {
      await Purchases.purchasePackage(pack);
      console.log('Package para compra: ', pack);
      setUser((prevUser) => ({
        ...prevUser,
        items: [...prevUser.items, pack.product.identifier],
        pro: true,
      }));
    } catch (err: any) {
      if (!err.userCancelled) {
        console.error('Purchase error: ', err);
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

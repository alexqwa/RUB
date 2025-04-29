import { View, FlatList, ActivityIndicator, Text } from 'react-native';

import { useRevenueCat } from '@/src/context/RevenueCatContext';

import { Header } from '@/src/components/Header';
import { PriceCard } from '@/src/components/PriceCard';
import { PurchasesPackage } from 'react-native-purchases';

export default function Pricing() {
  const { packages, purchasePackage, activeSubscriptions, loading } =
    useRevenueCat();

  async function handlePurchase(pack: PurchasesPackage) {
    await purchasePackage(pack);
  }

  return (
    <View className="bg-shapes-gray_200 flex-1 items-center">
      <Header title="Assinaturas" back />
      <View className="max-w-[85%] w-full flex-1">
        {loading ? (
          <View className="flex-1 justify-center items-center space-y-2">
            <ActivityIndicator size="small" color="#32264D" />
            <Text className="font-archivo_700 text-base text-heading">
              Carregando informações!
            </Text>
          </View>
        ) : (
          <FlatList
            className="pt-10"
            data={packages}
            keyExtractor={(item) => item.product.identifier}
            renderItem={({ item }) => {
              const isActive = activeSubscriptions.length > 0;

              return (
                <PriceCard
                  isActive={isActive}
                  title={item.product.description}
                  price={item.product.priceString}
                  onPress={() => handlePurchase(item)}
                />
              );
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          />
        )}
      </View>
    </View>
  );
}

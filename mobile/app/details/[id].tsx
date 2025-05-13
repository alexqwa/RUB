import { useLocalSearchParams } from 'expo-router';
import { useSharedValue } from 'react-native-reanimated';
import {
  View,
  Text,
  FlatList,
  ViewToken,
  ActivityIndicator,
} from 'react-native';

import { useManipulation } from '@/src/hooks/useManipulation';
import { useProductsByStreet } from '@/src/hooks/useProductsByStreet';

import { Header } from '@/src/components/Header';
import { Checkbox } from '@/src/components/Checkbox';
import { StreetItem } from '@/src/components/StreetItem';

export default function PresenceRoute() {
  const { title, type, id } = useLocalSearchParams();
  const viewableItems = useSharedValue<ViewToken[]>([]);
  const { manipulations, toggleFunctions } = useManipulation();
  const { products, loading } = useProductsByStreet(id.toString());

  return (
    <View className="flex-1 items-center bg-shapes-gray_200">
      <Header title={type.toString()} subtitle={title.toString()} back={true} />
      <View className="flex-1 w-full max-w-[85%] mt-14">
        <Text className="text-heading font-archivo_700 text-2xl mb-4">
          Formas de manipulação
        </Text>

        <View className="gap-3">
          {manipulations.map((manipulation) => {
            return (
              <View key={manipulation.id}>
                <Checkbox
                  label={manipulation.name}
                  checked={manipulation.selected}
                  onPress={() => {
                    toggleFunctions[manipulation.id]();
                  }}
                />
              </View>
            );
          })}
        </View>

        <View className="flex-1 mt-6">
          <Text className="text-heading text-lg font-archivo_700 mb-4">
            Lista de produtos ({products.length}):
          </Text>
          {loading ? (
            <View className="flex-1 mt-20 items-center space-y-2">
              <ActivityIndicator size="small" color="#32264D" />
              <Text className="font-archivo_700 text-base text-heading">
                Carregando informações!
              </Text>
            </View>
          ) : (
            <FlatList
              data={products}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => String(item.code)}
              contentContainerStyle={{ paddingBottom: 40 }}
              onViewableItemsChanged={({ viewableItems: viewItems }) => {
                viewableItems.value = viewItems;
              }}
              renderItem={({ item }) => (
                <StreetItem
                  item={item}
                  code={item.code}
                  title={item.title}
                  stock={item.stock}
                  viewableItems={viewableItems}
                />
              )}
            />
          )}
        </View>
      </View>
    </View>
  );
}

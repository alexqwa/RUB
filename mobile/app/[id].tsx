import { useSharedValue } from 'react-native-reanimated';
import { router, useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  FlatList,
  ViewToken,
  ActivityIndicator,
} from 'react-native';

import { useStreetsByEnvironment } from '@/src/hooks/useStreetsByEnvironment';

import { Header } from '@/src/components/Header';
import { Street } from '@/src/components/Street';

export default function PresenceRoute() {
  const { id, title, type } = useLocalSearchParams();
  const { streets, loading } = useStreetsByEnvironment(id.toString());

  const viewableItems = useSharedValue<ViewToken[]>([]);

  return (
    <View className="flex-1 items-center bg-shapes-gray_200">
      <Header title={type.toString()} subtitle={title.toString()} back={true} />
      <View className="flex-1 w-full max-w-[85%] mt-14">
        <Text className="text-heading font-archivo_700 text-2xl mb-5">
          Corredores
        </Text>

        {loading ? (
          <View className="flex-1 justify-center items-center space-y-2">
            <ActivityIndicator size="small" color="#32264D" />
            <Text className="font-archivo_700 text-base text-heading">
              Carregando informações!
            </Text>
          </View>
        ) : (
          <FlatList
            data={streets}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => String(item.code)}
            contentContainerStyle={{ paddingBottom: 60 }}
            onViewableItemsChanged={({ viewableItems: viewItems }) => {
              viewableItems.value = viewItems;
            }}
            renderItem={({ item }) => (
              <Street
                item={item}
                title={item.title}
                isActive={item.isActive}
                viewableItems={viewableItems}
                onPress={() =>
                  router.push({
                    pathname: '/details/[id]',
                    params: { id: item.code, title: item.title, type: type },
                  })
                }
              />
            )}
          />
        )}
      </View>
    </View>
  );
}

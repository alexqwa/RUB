import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

import { useStreetsByEnvironment } from '@/src/hooks/useStreetsByEnvironment';

import { Header } from '@/src/components/Header';
import { Street } from '@/src/components/Street';

export default function PresenceRoute() {
  const { id, title, type } = useLocalSearchParams();
  const { streets, loading } = useStreetsByEnvironment(id.toString());

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
            keyExtractor={(item) => String(item.code)}
            renderItem={({ item }) => (
              <Street
                title={item.title}
                isActive={item.isActive}
                onPress={() =>
                  router.push({
                    pathname: '/details/[id]',
                    params: { id: item.code, title: item.title, type: type },
                  })
                }
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 60 }}
          />
        )}
      </View>
    </View>
  );
}

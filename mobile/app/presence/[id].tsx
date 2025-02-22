import { useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

import { useStreet } from '@/src/context/StreetContext';

import { Header } from '@/src/components/ui/Header';
import { Street } from '@/src/components/ui/Street';

export default function PresenceRoute() {
  const { id, title } = useLocalSearchParams();
  const { streets, loading, getStreetsByEnvironment } = useStreet();

  useEffect(() => {
    async function handleStreet() {
      await getStreetsByEnvironment(id.toString());
    }

    handleStreet();
  }, [id]);

  return (
    <View className="flex-1 items-center bg-shapes-background">
      <Header title="Presença" subtitle={title.toString()} back={true} />
      <View className="flex-1 w-full max-w-[90%] mt-10">
        <Text className="text-heading font-archivo_700 text-2xl mb-5">
          Corredores
        </Text>

        {loading ? (
          <View className="py-10 items-center space-y-2">
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
                onPress={
                  item.isActive
                    ? () =>
                        router.push({
                          pathname: '/presence/street/[id]',
                          params: { id: item.code, title: item.title },
                        })
                    : undefined
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

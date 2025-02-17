import { useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';

import { Header } from '@/src/components/ui/Header';
import { Dropdown } from '@/src/components/Dropdown';

const data = [
  '38149: PRODUTO EM TESTES PRODUTO EM TESTES......',
  '38149: PRODUTO EM TESTES PRODUTO EM TESTES......',
  '38149: PRODUTO EM TESTES PRODUTO EM TESTES......',
  '38149: PRODUTO EM TESTES PRODUTO EM TESTES......',
  '38149: PRODUTO EM TESTES PRODUTO EM TESTES......',
  '38149: PRODUTO EM TESTES PRODUTO EM TESTES......',
  '38149: PRODUTO EM TESTES PRODUTO EM TESTES......',
  '38149: PRODUTO EM TESTES PRODUTO EM TESTES......',
  '38149: PRODUTO EM TESTES PRODUTO EM TESTES......',
];

export default function PresenceRoute() {
  const { id, title } = useLocalSearchParams();

  return (
    <View className="flex-1 items-center bg-background">
      <Header title="Presença" subtitle={title.toString()} back={true} />
      <View className="flex-1 w-full max-w-[90%] mt-10">
        <Text className="text-white font-rajdhani_700 text-2xl mb-5">
          Formas de manipulação
        </Text>
        <Dropdown />

        <View className="flex-1">
          <Text className="text-white text-lg font-rajdhani_700 mt-10 mb-4">
            Lista de produtos ({data.length}):
          </Text>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 60 }}
            showsVerticalScrollIndicator={false}
          >
            {Array.from({ length: data.length }).map((_, i) => {
              return (
                <Text
                  className="text-white font-rajdhani_700 text-base"
                  key={i}
                >
                  {data[i]}
                </Text>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

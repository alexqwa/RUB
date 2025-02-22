import { useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';

import { Header } from '@/src/components/ui/Header';
import { Dropdown } from '@/src/components/interactives/Dropdown';

const data = [
  '38149: BISC RECH GULOSOS BAUDDUCO 140G',
  '38149: BISC RECH GULOSOS BAUDDUCO 140G',
  '38149: BISC RECH GULOSOS BAUDDUCO 140G',
  '38149: BISC RECH GULOSOS BAUDDUCO 140G',
  '38149: BISC RECH GULOSOS BAUDDUCO 140G',
  '38149: BISC RECH GULOSOS BAUDDUCO 140G',
  '38149: BISC RECH GULOSOS BAUDDUCO 140G',
  '38149: BISC RECH GULOSOS BAUDDUCO 140G',
  '38149: BISC RECH GULOSOS BAUDDUCO 140G',
  '38149: BISC RECH GULOSOS BAUDDUCO 140G',
];

export default function StreetRoute() {
  const { title } = useLocalSearchParams();

  return (
    <View className="flex-1 items-center bg-shapes-background">
      <Header title="Etiquetas" subtitle={title.toString()} back={true} />
      <View className="w-full flex-1 max-w-[90%] mt-10">
        <Text className="text-heading font-archivo_700 text-2xl mb-5">
          Formas de manipulação
        </Text>
        <Dropdown />

        <View className="flex-1">
          <Text className="text-heading text-lg font-archivo_700 mt-10 mb-4">
            Lista de produtos ({data.length}):
          </Text>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 60 }}
            showsVerticalScrollIndicator={false}
          >
            {Array.from({ length: data.length }).map((_, i) => {
              return (
                <Text
                  numberOfLines={1}
                  className="text-subtitle font-archivo_600 text-sm"
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

import { View, Text } from "react-native"
import { Feather } from "@expo/vector-icons"

export function Warning() {
  return (
    <View className="mt-10 border-dashed border rounded-lg border-zinc-500 p-6">
      <View className="flex-row space-x-4 items-center justify-center">
        <Feather name="alert-octagon" size={24} color="#F7DD43" />
        <Text className="text-yelp font-rajdhani_700 text-sm leading-snug">
          Use as funções deste app com segurança. Tenha cuidado para evitar
          problemas maiores!
        </Text>
      </View>
    </View>
  )
}

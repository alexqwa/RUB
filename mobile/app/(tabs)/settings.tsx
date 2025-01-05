import { View, Text } from "react-native"

import { Header } from "@/src/components/Header"

export default function Settings() {
  return (
    <View className="bg-background flex-1 items-center">
      <Header back={false} title="Configurações" />
      <View className="flex-1 justify-center items-center w-full max-w-[90%]">
        <Text className="text-white font-rajdhani_700 text-lg">
          Nada por aqui no momento...
        </Text>
      </View>
    </View>
  )
}

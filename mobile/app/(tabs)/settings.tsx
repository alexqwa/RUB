import { View, Text } from "react-native"
import { Feather } from "@expo/vector-icons"

import { date_month } from "@/src/lib/dayjs"

import { Header } from "@/src/components/Header"
import { Profile } from "@/src/components/Profile"

export default function Settings() {
  return (
    <View className="bg-background flex-1 items-center">
      <Header back={false} title="Configurações" />
      <View className="flex-1 w-full max-w-[90%]">
        <Profile />
        <View className="bg-foreground p-4 rounded-xl border border-outline space-y-2">
          <Text className="text-white text-base font-rajdhani_700">
            Sua licença: fc38a21a-ecf4-4dc4-9241-c3a135741661
          </Text>
          <Text className="text-white text-base font-rajdhani_700">
            Data de ativação: {date_month}
          </Text>
          <Text className="text-white text-base font-rajdhani_700">
            Expira em: 30 dias...
          </Text>
        </View>
        <View className="mt-10 border-dashed border rounded-lg border-zinc-500 p-6">
          <View className="flex-row space-x-4 items-center justify-center">
            <Feather name="alert-octagon" size={24} color="#F7DD43" />
            <Text className="text-yelp font-rajdhani_700 text-sm leading-snug">
              Não compartilhe sua licença com ninguém, ela é única e
              intransferível.
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

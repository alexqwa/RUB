import dayjs from "dayjs"
import { Feather } from "@expo/vector-icons"
import { View, Text, FlatList } from "react-native"

import { useLicense } from "@/src/lib/LicenseContext"

import { Header } from "@/src/components/Header"
import { Profile } from "@/src/components/Profile"

export default function Settings() {
  const { licenses } = useLicense()

  return (
    <View className="bg-background flex-1 items-center">
      <Header back={false} title="Configurações" />
      <View className="flex-1 w-full max-w-[90%]">
        <Profile />
        <View className="bg-foreground rounded-xl border py-2 border-outline space-y-2">
          <FlatList
            data={licenses}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View className="px-4 divide-y-[1px] divide-outline">
                <Text className="text-white/80 text-base py-2 font-rajdhani_700">
                  Sua licença:{" "}
                  <Text className="text-green-400">{item.key}</Text>
                </Text>
                <Text className="text-white/80 text-base py-2 font-rajdhani_700">
                  Licença ativada em:
                  <Text className="text-green-400">
                    {" "}
                    {dayjs(item.createdAt).format("D [de] MMMM, YYYY")} às{" "}
                    {dayjs(item.createdAt).format("H:mm A")}
                  </Text>
                </Text>
                <Text className="text-white/80 text-base py-2 font-rajdhani_700">
                  Expira em:
                  <Text className="text-green-400">
                    {" "}
                    {dayjs(item.expiresAt).format("D [de] MMMM, YYYY")} às{" "}
                    {dayjs(item.expiresAt).format("H:mm A")}
                  </Text>
                </Text>
              </View>
            )}
          />
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

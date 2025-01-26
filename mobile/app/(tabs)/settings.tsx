import dayjs from "dayjs"
import { useEffect, useState } from "react"
import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native"

import { useLicense } from "@/src/lib/LicenseContext"

import { Header } from "@/src/components/Header"
import { Warning } from "@/src/components/Warning"
import { Profile } from "@/src/components/Profile"

export default function Settings() {
  const [loading, setLoading] = useState(true)
  const { licenses, deleteLicense } = useLicense()

  useEffect(() => {
    try {
      if (licenses) {
        setLoading(false)
      }
    } catch (error) {
      console.error("Não foi possível carregar informações!", error)
    }
  }, [licenses])

  return (
    <View className="bg-background flex-1 items-center">
      <Header back={false} title="Configurações" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 w-full max-w-[90%] pt-10"
      >
        {loading ? (
          <ActivityIndicator size="small" color="#F7DD43" />
        ) : (
          <FlatList
            data={licenses}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View className="space-y-10">
                <Profile onPress={() => deleteLicense(item.id)} />
                <View className="bg-foreground border border-outline rounded-lg px-4 py-2 divide-y-[1px] divide-outline">
                  <Text className="text-white/80 text-sm py-2 font-rajdhani_700">
                    Sua licença:{" "}
                    <Text className="text-green-400">{item.key}</Text>
                  </Text>
                  <Text className="text-white/80 text-sm py-2 font-rajdhani_700">
                    Licença ativada em:{" "}
                    <Text className="text-green-400">
                      {dayjs(item.createdAt).format(
                        "D [de] MMMM, YYYY [às] H:mm A"
                      )}
                    </Text>
                  </Text>
                  <Text className="text-white/80 text-sm py-2 font-rajdhani_700">
                    Sua licença expira em:{" "}
                    <Text className="text-green-400">
                      {dayjs(item.expiresAt).diff(dayjs(), "day")} dia(s)
                    </Text>
                  </Text>
                </View>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        )}
        <Warning />
      </ScrollView>
    </View>
  )
}

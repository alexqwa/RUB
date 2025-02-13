import dayjs from "dayjs"
import { useEffect, useState } from "react"
import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native"

import { useLicense } from "@/src/context/LicenseContext"

import { Header } from "@/src/components/Header"
import { Warning } from "@/src/components/Warning"
import { Profile } from "@/src/components/Profile"

export default function Settings() {
  const [loading, setLoading] = useState(false)
  const { licenses, deleteLicense } = useLicense()

  useEffect(() => {
    if (licenses) {
      setLoading(false)
    }
  }, [licenses])

  function formatTimeLeft(expiresAt: string) {
    const diffInMilliseconds = dayjs(expiresAt).diff(dayjs())
    const diffInMinutes = dayjs.duration(diffInMilliseconds).asMinutes()
    const diffInHours = dayjs.duration(diffInMilliseconds).asHours()
    const diffInDays = dayjs.duration(diffInMilliseconds).asDays()

    if (diffInDays >= 1) {
      return `${Math.floor(diffInDays)} dia(s)`
    } else if (diffInHours >= 1) {
      return `${Math.floor(diffInHours)} hora(s)`
    } else {
      return `${Math.floor(diffInMinutes)} minuto(s)`
    }
  }

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
            renderItem={({ item }) => {
              const timeLeftFormatted = formatTimeLeft(item.expiresAt)

              return (
                <View className="space-y-10">
                  <Profile
                    name={!item.user?.name ? "Agente" : item.user.name}
                    onPress={() => {
                      try {
                        deleteLicense(item.id)
                      } catch (error) {
                        console.error("Erro ao deletar licença!", error)
                      }
                    }}
                  />
                  <View className="bg-foreground border border-outline rounded-lg px-4 py-2 divide-y-[1px] divide-outline">
                    <Text className="text-white/80 text-sm py-2 font-rajdhani_700">
                      Sua licença:{" "}
                      <Text className="text-green-400">{item.key}</Text>
                    </Text>
                    <Text className="text-white/80 text-sm py-2 font-rajdhani_700">
                      Licença ativada em:{" "}
                      <Text className="text-green-400">
                        {dayjs(item.createdAt).format("DD/MM/YYYY [às] H:mm A")}
                      </Text>
                    </Text>
                    <Text className="text-white/80 text-sm py-2 font-rajdhani_700">
                      Sua licença expira em:{" "}
                      <Text className="text-green-400">
                        {timeLeftFormatted}
                      </Text>
                    </Text>
                  </View>
                </View>
              )
            }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        )}
        <Warning />
      </ScrollView>
    </View>
  )
}

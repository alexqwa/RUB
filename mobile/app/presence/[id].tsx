import { useState, useEffect } from "react"
import { router, useLocalSearchParams } from "expo-router"
import { View, Text, FlatList, ActivityIndicator } from "react-native"

import { api } from "@/src/lib/axios"
import { today } from "@/src/lib/dayjs"
import { Header } from "@/src/components/Header"
import { Street } from "@/src/components/Street"

interface Street {
  id: number
  code: string
  title: string
  weekday: number
  isActive: boolean
  departamentId: number
}

export default function PresenceRoute() {
  const { id, title } = useLocalSearchParams()
  const [loading, setLoading] = useState(true)
  const [streets, setStreets] = useState<Street[]>([])

  useEffect(() => {
    async function getStreetsByEnvironment() {
      try {
        const response = await api.get<Street[]>(`/departaments/${id}/streets`)
        const updatedStreets = response.data.map((street) => {
          const isActive = street.weekday === today

          return {
            ...street,
            isActive,
          }
        })

        setStreets(updatedStreets)
      } catch (error) {
        console.error("Erro ao buscar ruas", error)
      } finally {
        setLoading(false)
      }
    }
    getStreetsByEnvironment()
  }, [id])

  return (
    <View className="flex-1 items-center bg-background">
      <Header title="Presença" subtitle={title.toString()} back={true} />
      <View className="flex-1 w-full max-w-[90%] mt-10">
        <Text className="text-white font-rajdhani_700 text-2xl mb-5">
          Corredores
        </Text>

        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <FlatList
            data={streets}
            keyExtractor={(item) => String(item.code)}
            renderItem={({ item }) => (
              <Street
                title={item.title}
                active={item.isActive}
                onPress={
                  item.isActive
                    ? () =>
                        router.push({
                          pathname: "/presence/street/[id]",
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
  )
}

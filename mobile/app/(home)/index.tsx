import { router } from "expo-router"
import { useState, useEffect } from "react"
import { Feather } from "@expo/vector-icons"
import {
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native"

import { api } from "@/src/lib/axios"
import { Header } from "@/src/components/Header"
import { Departament } from "@/src/components/Departament"
import { today, weekday, date_month } from "@/src/lib/dayjs"

interface Weekday {
  id: number
  day: number
  departamentId: number
}

interface Departament {
  id: number
  title: string
  isActive: boolean
  weekdays: Weekday[]
}

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [departaments, setDepartaments] = useState<Departament[]>([])

  useEffect(() => {
    async function fetchDepartaments() {
      try {
        const response = await api.get<Departament[]>("/departaments")
        const updatedDepartaments = response.data.map((departament) => {
          // Verifica se algum 'day' em weekdays corresponde ao dia atual
          const isActive = departament.weekdays.some(
            (weekday) => weekday.day === today
          )

          return {
            ...departament,
            isActive,
          }
        })

        setDepartaments(updatedDepartaments)
      } catch (error) {
        console.error("Erro ao buscar departamentos", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDepartaments()
  }, [])

  return (
    <View className="items-center bg-background flex-1">
      <Header title="Auditoria de Presença" back={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
        className="flex-1 w-full"
      >
        <View className="w-full flex-1 max-w-[90%] mt-10">
          <View className="items-center w-full justify-between flex-row mb-5">
            <Text className="text-white font-rajdhani_700 text-2xl">
              Departamentos
            </Text>
            <View className="flex-col items-end">
              <Text className="text-white font-rajdhani_700 text-sm">
                {date_month}
              </Text>
              <Text className="text-white font-rajdhani_700 text-sm">
                {weekday}
              </Text>
            </View>
          </View>

          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <FlatList
              data={departaments}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <Departament
                  title={item.title}
                  active={item.isActive}
                  onPress={
                    item.isActive
                      ? () =>
                          router.push({
                            pathname: "/presence/[id]",
                            params: { id: item.id, title: item.title },
                          })
                      : undefined
                  }
                />
              )}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>
      <View className="mb-10 border-dashed border rounded-lg border-zinc-400 max-w-[90%] w-full p-6">
        <View className="flex-row space-x-4 items-center justify-center">
          <Feather name="alert-circle" size={24} color="#fff" />
          <Text className="text-white/80 font-rajdhani_700 text-sm leading-snug">
            Use as funções deste app com segurança. Tenha cuidado para evitar
            problemas maiores!
          </Text>
        </View>
      </View>
    </View>
  )
}

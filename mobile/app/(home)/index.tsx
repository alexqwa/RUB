import { router } from "expo-router"
import { useState, useEffect } from "react"
import { Feather } from "@expo/vector-icons"
import {
  View,
  Text,
  Alert,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native"

import { api } from "@/src/lib/axios"
import { today, weekday, date_month } from "@/src/lib/dayjs"

import { Header } from "@/src/components/Header"
import { Departament } from "@/src/components/Departament"
import { EnvironmentsDate } from "@/src/components/EnvironmentsDate"

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
        Alert.alert("Erro!", "Erro ao buscar departamentos.", [
          {
            text: "Cancelar",
            onPress: () => console.log("Cancelar pressionado!"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => console.log("OK pressionado!"),
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchDepartaments()
  }, [departaments])

  return (
    <View className="items-center bg-background flex-1">
      <Header title="Auditoria de Presença" back={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 w-full max-w-[90%] pt-10"
      >
        <EnvironmentsDate date={date_month} weekday={weekday} />
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
        <View className="mt-10 border-dashed border rounded-lg border-zinc-500 p-6">
          <View className="flex-row space-x-4 items-center justify-center">
            <Feather name="alert-octagon" size={24} color="#F7DD43" />
            <Text className="text-[#F7DD43] font-rajdhani_700 text-sm leading-snug">
              Use as funções deste app com segurança. Tenha cuidado para evitar
              problemas maiores!
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

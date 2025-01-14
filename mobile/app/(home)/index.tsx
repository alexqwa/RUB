import { router } from "expo-router"
import { Feather } from "@expo/vector-icons"
import { View, Text, FlatList, ScrollView } from "react-native"

import { weekday, date_month } from "@/src/lib/dayjs"
import { useDepartament } from "@/src/lib/DepartamentContext"

import { Header } from "@/src/components/Header"
import { Departament } from "@/src/components/Departament"
import { EnvironmentsDate } from "@/src/components/EnvironmentsDate"

export default function Home() {
  const { departaments } = useDepartament()

  return (
    <View className="items-center bg-background flex-1">
      <Header title="Auditoria de Presença" back={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 w-full max-w-[90%] pt-10"
      >
        <EnvironmentsDate date={date_month} weekday={weekday} />
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
        <View className="mt-10 border-dashed border rounded-lg border-zinc-500 p-6">
          <View className="flex-row space-x-4 items-center justify-center">
            <Feather name="alert-octagon" size={24} color="#F7DD43" />
            <Text className="text-yelp font-rajdhani_700 text-sm leading-snug">
              Use as funções deste app com segurança. Tenha cuidado para evitar
              problemas maiores!
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

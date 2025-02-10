import React from "react"
import { router } from "expo-router"
import { View, FlatList, ScrollView, ActivityIndicator } from "react-native"

import { weekday, date_month } from "@/src/lib/dayjs"
import { useDepartament } from "@/src/lib/DepartamentContext"

import { Header } from "@/src/components/Header"
import { Warning } from "@/src/components/Warning"
import { Departament } from "@/src/components/Departament"
import { EnvironmentsDate } from "@/src/components/EnvironmentsDate"

export default function Home() {
  const { departaments, loading } = useDepartament()

  return (
    <View className="items-center bg-background flex-1">
      <Header title="Auditoria de Presença" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 w-full max-w-[90%] pt-10"
      >
        <EnvironmentsDate date={date_month} weekday={weekday} />
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
            <FlatList
              data={departaments}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <Departament
                  title={item.title}
                  isActive={item.isActive}
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
            <Warning />
          </>
        )}
      </ScrollView>
    </View>
  )
}

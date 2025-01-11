import { View, Text } from "react-native"

interface HeaderProps {
  date: string
  weekday: string
}

export function EnvironmentsDate({ date, weekday }: HeaderProps) {
  return (
    <View className="items-center w-full justify-between flex-row mb-5">
      <Text className="text-white font-rajdhani_700 text-2xl">
        Departamentos
      </Text>
      <View className="flex-col items-end">
        <Text className="text-white font-rajdhani_700 text-sm">{date}</Text>
        <Text className="text-white font-rajdhani_700 text-sm">{weekday}</Text>
      </View>
    </View>
  )
}

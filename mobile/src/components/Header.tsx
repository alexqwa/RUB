import { router } from "expo-router"
import { Feather } from "@expo/vector-icons"
import { View, Text, StatusBar, TouchableOpacity } from "react-native"

interface HeaderProps {
  back: boolean
  title: string
  subtitle?: string
}

export function Header({ title, subtitle, back }: HeaderProps) {
  const statusBarHeight = StatusBar.currentHeight || 0

  return (
    <View
      style={{ marginTop: statusBarHeight }}
      className="relative bg-foreground h-24 w-full items-center justify-center"
    >
      <View className="max-w-[90%] w-full items-center justify-center">
        {back ? (
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-0"
          >
            <Feather name="arrow-left" size={18} color="#fff" />
          </TouchableOpacity>
        ) : null}

        <Text className="text-white text-base font-rajdhani_700">
          {title}
          {subtitle ? `: ${subtitle}` : null}
        </Text>
      </View>
    </View>
  )
}

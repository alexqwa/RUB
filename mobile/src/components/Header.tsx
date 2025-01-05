import { Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { View, Text, TouchableOpacity } from "react-native"

type HeaderProps = {
  title: string
  back: boolean
  parameter?: string
}

export function Header({ title, parameter, back }: HeaderProps) {
  const { goBack } = useNavigation()

  return (
    <View className="bg-foreground h-28 w-full justify-center items-center">
      <View className="relative max-w-[90%] w-full flex-row items-center justify-center mt-10">
        {back ? (
          <TouchableOpacity
            onPress={() => goBack()}
            className="absolute left-0"
          >
            <Feather name="arrow-left" size={18} color="#ffff" />
          </TouchableOpacity>
        ) : null}
        <View className="flex-row">
          <Text className="text-white font-rajdhani_700 text-base">
            {title}
          </Text>
          {parameter ? (
            <Text className="text-white font-rajdhani_700 text-base">
              : {parameter}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  )
}

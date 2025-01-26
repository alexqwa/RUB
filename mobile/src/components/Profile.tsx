import { Feather } from "@expo/vector-icons"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native"

import profileImg from "@/assets/images/profile.png"

export function Profile({ ...rest }: TouchableOpacityProps) {
  return (
    <View className="flex-row items-center justify-between w-full">
      <View className="flex-row space-x-3 items-center">
        <View className="h-12 w-12 rounded-lg bg-foreground overflow-hidden border-2 border-outline/50">
          <Image source={profileImg} className="rounded-lg bg-cover" />
        </View>
        <View>
          <Text className="text-white font-roboto_700 text-base">
            Olá, Agente
          </Text>
          <Text className="text-white/80 font-poppins_500">
            Qual departamento hoje ?
          </Text>
        </View>
      </View>
      <TouchableOpacity
        {...rest}
        activeOpacity={0.8}
        className="items-center justify-center w-12 h-12 bg-yelp rounded-lg"
      >
        <Feather name="power" size={18} color="#121214 " />
      </TouchableOpacity>
    </View>
  )
}

import { Feather } from "@expo/vector-icons"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native"

interface ProfileProps extends  TouchableOpacityProps{
  name?: string 
}

export function Profile({name ,...rest }: ProfileProps) {
  return (
    <View className="flex-row items-center justify-between w-full">
      <View className="flex-row space-x-3 items-center">
        <View>
          <Text className="text-white font-roboto_700 text-base">
            Olá, {name}
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

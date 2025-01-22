import { router } from "expo-router"
import { Feather } from "@expo/vector-icons"
import { View, Text, Image, TouchableOpacity } from "react-native"

import profileImg from "@/assets/images/profile.png"

export function Profile() {
  return (
    <View className="flex-row items-center justify-between w-full my-10">
      <View className="flex-row space-x-3 items-center">
        <View className="h-12 w-12 rounded-lg bg-foreground overflow-hidden border-2 border-outline/50">
          <Image source={profileImg} className="rounded-lg bg-cover" />
        </View>
        <View>
          <Text className="text-white font-poppins_500 text-base">
            Olá, Alexandre
          </Text>
          <Text className="text-white/80 font-poppins_700">
            Qual departamento hoje ?
          </Text>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.replace("/license")}
        className="items-center justify-center w-12 h-12 bg-yelp rounded-lg"
      >
        <Feather name="power" size={18} color="#121214 " />
      </TouchableOpacity>
    </View>
  )
}

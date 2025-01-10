import { router } from "expo-router"
import { Feather } from "@expo/vector-icons"
import { View, Text, TextInput, TouchableOpacity } from "react-native"

import { Header } from "@/src/components/Header"

export default function License() {
  return (
    <View className="bg-background flex-1 items-center">
      <Header back={false} title="Verificação de Licença" />
      <View className="w-full max-w-[90%] items-center my-auto justify-center">
        <View className="items-center space-y-2 mb-10">
          <View className="bg-foreground p-8 rounded-3xl border border-outline mb-6">
            <Feather name="alert-octagon" size={46} color="#F7DD43" />
          </View>
          <Text className="text-white text-4xl font-rajdhani_700">
            VERIFICAÇÃO DE
            <Text className="text-green-400"> LICENÇA</Text>
          </Text>
          <Text className="text-white font-rajdhani_700 text-base text-center">
            Para que você possa prosseguir, precisamos{"\n"}que digite sua
            licença de acesso.
          </Text>
        </View>
        <View className="space-y-3 w-full">
          <TextInput
            placeholder="DIGITE SUA LICENÇA"
            placeholderTextColor="#8D8D99"
            selectionColor="#F7DD43"
            className="bg-foreground text-white font-rajdhani_700 rounded-lg px-4 h-13 border border-outline"
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.replace("/(tabs)")}
            className="bg-[#F7DD43] h-13 rounded-lg items-center justify-center"
          >
            <Text className="font-rajdhani_700 uppercase text-base">
              Fazer login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

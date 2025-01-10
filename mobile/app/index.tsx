import { router } from "expo-router"
import { View, Text, TouchableOpacity } from "react-native"

export default function Homepage() {
  return (
    <View className="bg-background flex-1 items-center justify-center">
      <View className="w-full max-w-[80%] space-y-6 items-center">
        <Text className="text-white text-4xl font-rajdhani_700">
          RUB
          <Text className="text-green-400"> UNLOCKED</Text>
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.replace("/license")}
          className="w-full bg-[#F7DD43] h-[52px] rounded-lg items-center justify-center"
        >
          <Text className="uppercase text-black font-rajdhani_700 text-base">
            Entrar para área de autenticação
          </Text>
        </TouchableOpacity>
        <Text className="text-[#C4C4CC] text-center font-rajdhani_700 text-base">
          Não utilizamos nenhuma informação além do seu CPF para fazer acesso ao
          servidor.
        </Text>
      </View>
    </View>
  )
}

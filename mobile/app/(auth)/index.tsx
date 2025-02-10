import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native"

import { Header } from "@/src/components/Header"
import { router } from "expo-router"

export default function SignIn() {
  return (
    <View className="bg-background flex-1 items-center">
      <Header title="Autenticação" />
      <KeyboardAvoidingView className="w-full flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: "auto",
            marginBottom: "auto",
            alignItems: "center",
          }}
        >
          <View className="flex-1 items-center w-full max-w-[90%]">
            <View className="mb-10 items-center">
              <Text className="text-white text-4xl font-rajdhani_700">
                FAZER CADASTRO
              </Text>
              <Text className="text-white text-center text-base font-rajdhani_700">
                Basta preencher esses dados e você{"\n"}estará conosco.
              </Text>
            </View>
            <View className="w-full space-y-3">
              <TextInput
                placeholder="DIGITE SEU NOME"
                placeholderTextColor="#8D8D99"
                selectionColor="#F7DD43"
                className="bg-foreground text-white font-rajdhani_700 rounded-lg px-4 h-13 border border-outline"
              />
              <TextInput
                placeholder="DIGITE SUA LICENÇA"
                placeholderTextColor="#8D8D99"
                selectionColor="#F7DD43"
                className="bg-foreground text-white font-rajdhani_700 rounded-lg px-4 h-13 border border-outline"
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push("/license")}
                className="h-13 items-center justify-center bg-yelp rounded-lg"
              >
                <Text className="font-rajdhani_700 uppercase text-base">
                  Concluir cadastro
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

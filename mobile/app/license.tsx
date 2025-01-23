import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native"

import { Header } from "@/src/components/Header"
import { useLicense } from "@/src/lib/LicenseContext"

export default function License() {
  const [licenseKey, setLicenseKey] = useState("")
  const { verifyLicense } = useLicense()

  async function handleVerify() {
    await verifyLicense(licenseKey)
  }

  return (
    <View className="bg-background flex-1 items-center">
      <Header back={false} title="Verificação de Licença" />
      <KeyboardAvoidingView
        className="flex-1 w-full"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          <View className="flex-1 items-center w-full max-w-[90%]">
            <View className="space-y-2 mb-10">
              <Text className="text-white text-center font-rajdhani_700 text-4xl">
                VERIFICAÇÃO DE <Text className="text-green-500">LICENÇA!</Text>
              </Text>
              <Text className="text-white font-rajdhani_700 text-base text-center">
                Para que você possa prosseguir, precisamos{"\n"}que digite sua
                licença de acesso.
              </Text>
            </View>
            <View className="w-full space-y-3">
              <TextInput
                value={licenseKey}
                onChangeText={setLicenseKey}
                placeholder="DIGITE SUA LICENÇA"
                placeholderTextColor="#8D8D99"
                selectionColor="#F7DD43"
                className="bg-foreground text-white font-rajdhani_700 rounded-lg px-4 h-13 border border-outline"
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleVerify}
                className="bg-[#F7DD43] h-13 rounded-lg items-center justify-center"
              >
                <Text className="font-rajdhani_700 uppercase text-base">
                  Fazer login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

import clsx from "clsx"
import { useEffect, useState } from "react"
import {
  View,
  Text,
  Platform,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native"

import { Header } from "@/src/components/Header"
import { useLicense } from "@/src/lib/LicenseContext"

export default function License() {
  const { verifyLicense } = useLicense()
  const [loading, setLoading] = useState(false)
  const [licenseKey, setLicenseKey] = useState("")

  async function handleVerify() {
    setLoading(true)

    try {
      await verifyLicense(licenseKey)
    } catch (error) {
      console.log("Erro ao verificar a licença. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="bg-background flex-1 items-center">
      <Header title="Verificação de Licença" />
      <KeyboardAvoidingView
        className="flex-1 w-full"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: "auto",
            alignItems: "center",
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
                disabled={!licenseKey || loading}
                onPress={handleVerify}
                className={clsx(
                  "bg-yelp h-13 rounded-lg items-center justify-center transition-all",
                  {
                    ["bg-[#cab332]"]: !licenseKey,
                  }
                )}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#202024" />
                ) : (
                  <Text className="font-rajdhani_700 uppercase text-base">
                    Fazer login
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

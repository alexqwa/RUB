import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { Feather } from "@expo/vector-icons"
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native"

import { useLicense } from "@/src/lib/LicenseContext"

import { Label } from "@/src/components/Label"
import { Header } from "@/src/components/Header"
import { Warning } from "@/src/components/Warning"
import profileImg from "@/assets/images/profile.png"

export default function Settings() {
  const [loading, setLoading] = useState(true)
  const { licenses, deleteLicense } = useLicense()

  useEffect(() => {
    try {
      if (licenses) {
        setLoading(false)
      }
    } catch (error) {
      console.error("Não foi possível carregar informações!", error)
    }
  }, [licenses])

  return (
    <View className="bg-background flex-1 items-center">
      <Header back={false} title="Configurações" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 w-full max-w-[90%] pt-10"
      >
        {loading ? (
          <ActivityIndicator size="small" color="#F7DD43" />
        ) : (
          <FlatList
            data={licenses}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View className="space-y-10">
                <View className="flex-row items-center justify-between w-full">
                  <View className="flex-row space-x-3 items-center">
                    <View className="h-12 w-12 rounded-lg bg-foreground overflow-hidden border-2 border-outline/50">
                      <Image
                        source={profileImg}
                        className="rounded-lg bg-cover"
                      />
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
                    activeOpacity={0.8}
                    onPress={() => deleteLicense(item.id)}
                    className="items-center justify-center w-12 h-12 bg-yelp rounded-lg"
                  >
                    <Feather name="power" size={18} color="#121214 " />
                  </TouchableOpacity>
                </View>
                <View className="bg-foreground border border-outline rounded-lg px-4 py-2">
                  <Label title="Sua licença:" params={item.key} />
                  <Label
                    title="Licença ativada em:"
                    params={dayjs(item.createdAt).format("D [de] MMMM, YYYY")}
                  />
                  <Label
                    title="Expira em:"
                    params={`${dayjs(item.expiresAt).diff(
                      item.createdAt,
                      "day"
                    )} dia(s)...`}
                  />
                </View>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        )}
        <Warning />
      </ScrollView>
    </View>
  )
}

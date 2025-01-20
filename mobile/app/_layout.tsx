import React, { useEffect } from "react"
import { Stack } from "expo-router"
import { useFonts } from "expo-font"
import { StatusBar } from "react-native"
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto"
import { Rajdhani_700Bold } from "@expo-google-fonts/rajdhani"
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins"
import * as SplashScreen from "expo-splash-screen"
import "@/src/lib/dayjs"
import { LicenseProvider } from "@/src/lib/LicenseContext"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Rajdhani_700Bold,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <LicenseProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="license" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(home)" />
      </Stack>
      <StatusBar translucent barStyle={"light-content"} />
    </LicenseProvider>
  )
}

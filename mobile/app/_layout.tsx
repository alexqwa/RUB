import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import {
  Archivo_400Regular,
  Archivo_600SemiBold,
  Archivo_700Bold,
} from '@expo-google-fonts/archivo';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';

import '@/src/lib/dayjs';
import { LicenseProvider } from '@/src/context/LicenseContext';
import { RevenueCatProvider } from '@/src/context/RevenueCatContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Archivo_400Regular,
    Archivo_600SemiBold,
    Archivo_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <RevenueCatProvider>
      <LicenseProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(home)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
        <StatusBar
          translucent
          barStyle={'light-content'}
          backgroundColor="#774dd6"
        />
      </LicenseProvider>
    </RevenueCatProvider>
  );
}

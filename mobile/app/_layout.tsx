import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import {
  Archivo_400Regular,
  Archivo_600SemiBold,
  Archivo_700Bold,
} from '@expo-google-fonts/archivo';
import { Rajdhani_700Bold } from '@expo-google-fonts/rajdhani';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';

import '@/src/lib/dayjs';
import { StreetProvider } from '@/src/context/StreetContext';
import { LicenseProvider } from '@/src/context/LicenseContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Rajdhani_700Bold,
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
    <LicenseProvider>
      <StreetProvider>
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
          backgroundColor="#6842C2"
        />
      </StreetProvider>
    </LicenseProvider>
  );
}

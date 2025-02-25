import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function AuthLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          animationDuration: 100,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="Onboarding/Pricing" />
        <Stack.Screen name="Onboarding/SignUpUser" />
        <Stack.Screen name="Onboarding/SignUpLicense" />
        <Stack.Screen name="Onboarding/SignUpFinished" />
      </Stack>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor="#774dd6"
      />
    </>
  );
}

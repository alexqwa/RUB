import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 100,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="Onboarding/signup_user" />
      <Stack.Screen name="Onboarding/signup_license" />
      <Stack.Screen name="Onboarding/signup_finished" />
    </Stack>
  );
}

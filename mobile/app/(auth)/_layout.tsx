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
      <Stack.Screen name="signup_user" />
      <Stack.Screen name="signup_license" />
      <Stack.Screen name="signup_finished" />
    </Stack>
  );
}

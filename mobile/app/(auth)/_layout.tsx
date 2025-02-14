import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 200,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="signup_user" />
      <Stack.Screen name="signup_license" />
      <Stack.Screen name="signup_finished" />
    </Stack>
  );
}

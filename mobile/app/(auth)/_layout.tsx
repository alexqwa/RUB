import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function AuthLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="Pricing" />
        <Stack.Screen name="Authentication" />
      </Stack>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor="#774dd6"
      />
    </>
  );
}

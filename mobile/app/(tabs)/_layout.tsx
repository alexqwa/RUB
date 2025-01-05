import Feather from "@expo/vector-icons/Feather"
import { Tabs } from "expo-router"

export default function AuthLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#202024",
          borderTopWidth: 0,
          height: 100,
        },
        tabBarActiveTintColor: "#F7DD43",
        tabBarInactiveTintColor: "#8D8D99",
        tabBarLabelPosition: "beside-icon",
        tabBarLabelStyle: {
          marginLeft: 30,
          fontSize: 16,
          fontFamily: "Rajdhani_700Bold",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Autenticação",
          tabBarIcon: ({ color }) => (
            <Feather size={18} name="key" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Configurações",
          tabBarIcon: ({ color }) => (
            <Feather size={18} name="settings" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

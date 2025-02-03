import { Tabs } from "expo-router"
import Feather from "@expo/vector-icons/Feather"

import { DepartamentProvider } from "@/src/lib/DepartamentContext"

export default function HomeLayout() {
  return (
    <DepartamentProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#202024",
            borderTopWidth: 1,
            borderColor: "#323238",
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
            title: "Presença",
            tabBarIcon: ({ color }) => (
              <Feather size={18} name="map" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="tags"
          options={{
            title: "Etiquetas",
            tabBarIcon: ({ color }) => (
              <Feather size={18} name="tag" color={color} />
            ),
          }}
        />
      </Tabs>
    </DepartamentProvider>
  )
}

import { Tabs } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderColor: '#E6E6F0',
          height: 100,
        },
        tabBarActiveBackgroundColor: '#EBEBF5',
        tabBarInactiveBackgroundColor: '#F8F8FC',
        tabBarActiveTintColor: '#32264D',
        tabBarInactiveTintColor: '#C1BCCC',
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle: {
          marginLeft: 30,
          fontSize: 16,
          fontFamily: 'Archivo_700Bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Autenticação',
          tabBarIcon: ({ color }) => (
            <Feather size={18} name="key" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="myprofile"
        options={{
          title: 'Meu perfil',
          tabBarIcon: ({ color }) => (
            <Feather size={18} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

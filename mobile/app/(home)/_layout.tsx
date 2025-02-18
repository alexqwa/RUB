import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DepartamentProvider } from '@/src/context/DepartamentContext';

export default function HomeLayout() {
  const insets = useSafeAreaInsets();

  return (
    <DepartamentProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            borderTopWidth: 1,
            borderColor: '#E6E6F0',
            height: Platform.OS === 'ios' ? 140 : 100,
            marginBottom: Platform.OS === 'ios' ? -insets.bottom : null,
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
            marginBottom: Platform.OS === 'ios' ? 30 : null,
          },
          tabBarIconStyle: {
            marginBottom: Platform.OS === 'ios' ? 30 : null,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Presença',
            tabBarIcon: ({ color }) => (
              <Feather size={18} name="map" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="tags"
          options={{
            title: 'Etiquetas',
            tabBarIcon: ({ color }) => (
              <Feather size={18} name="tag" color={color} />
            ),
          }}
        />
      </Tabs>
    </DepartamentProvider>
  );
}

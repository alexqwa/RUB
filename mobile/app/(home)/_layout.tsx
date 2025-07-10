import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeLayout() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 100,
            borderTopWidth: 1,
            borderColor: '#E6E6F0',
            marginBottom: insets.bottom,
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
            title: 'Presença',
            tabBarIcon: ({ color }) => (
              <Feather size={18} name="map" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Tickets"
          options={{
            title: 'Etiquetas',
            tabBarIcon: ({ color }) => (
              <Feather size={18} name="tag" color={color} />
            ),
          }}
        />
      </Tabs>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor="#774dd6"
      />
    </>
  );
}

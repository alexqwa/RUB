import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <>
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
            title: 'Autenticação',
            tabBarIcon: ({ color }) => (
              <Feather size={18} name="key" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="MyProfile"
          options={{
            title: 'Meu perfil',
            tabBarIcon: ({ color }) => (
              <Feather size={18} name="user" color={color} />
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

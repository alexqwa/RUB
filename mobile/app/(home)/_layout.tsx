import { Tabs } from 'expo-router';
import { StatusBar, Pressable, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function HomeLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 100,
            borderTopWidth: 1,
            borderColor: '#E6E6F0',
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
            tabBarButton: (props) => {
              const { ref, ...rest } = props;
              return (
                <Pressable
                  {...rest}
                  android_ripple={{ color: 'transparent' }}
                />
              );
            },
            tabBarIcon: ({ color }) => (
              <Feather size={18} name="map" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Tickets"
          options={{
            title: 'Etiquetas',
            tabBarButton: (props) => {
              const { ref, ...rest } = props;
              return (
                <Pressable
                  {...rest}
                  android_ripple={{ color: 'transparent' }}
                />
              );
            },
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

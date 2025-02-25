import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import Bubbles from '@/src/assets/bubbles.svg';
import { useLicense } from '@/src/context/LicenseContext';

import { Header } from '@/src/components/ui/Header';
import { ProfileCard } from '@/src/components/ui/ProfileCard';

export default function MyProfile() {
  const [loading, setLoading] = useState(true);
  const { licenses, deleteLicense } = useLicense();

  useEffect(() => {
    if (licenses) {
      setLoading(false);
    }
  }, [licenses]);

  function formatTimeLeft(expiresAt: string) {
    const diffInMilliseconds = dayjs(expiresAt).diff(dayjs());
    const diffInMinutes = dayjs.duration(diffInMilliseconds).asMinutes();
    const diffInHours = dayjs.duration(diffInMilliseconds).asHours();
    const diffInDays = dayjs.duration(diffInMilliseconds).asDays();

    if (diffInDays >= 1) {
      return `${Math.floor(diffInDays)} dia(s)...`;
    } else if (diffInHours >= 1) {
      return `${Math.floor(diffInHours)} hora(s)...`;
    } else {
      return `${Math.floor(diffInMinutes)} minuto(s)...`;
    }
  }

  return (
    <View className="bg-shapes-gray_200 flex-1 items-center">
      <Header title="Meu perfil" />
      <ScrollView
        className="w-full flex-1"
        contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center bg-shapes-purple_400 justify-center w-full py-10 space-y-6">
          <View className="absolute opacity-80">
            <Bubbles />
          </View>
          <View className="rounded-full items-center justify-center w-36 h-36 bg-white border border-[#E6E6F0]">
            <MaterialIcons name="face" size={100} color="#E6E6F0" />
          </View>
          <View className="items-center space-y-1">
            <Text className="font-archivo_700 text-white text-2xl">
              {licenses.map((license) => license.user?.name)}
            </Text>
            <Text
              numberOfLines={1}
              className="text-[#D4C2FF] font-poppins_400 text-sm max-w-[85%] bg-shapes-purple"
            >
              {licenses.map((license) => license.key)}
            </Text>
          </View>
        </View>

        {loading ? (
          <View className="py-10 items-center space-y-2">
            <ActivityIndicator size="small" color="#32264D" />
            <Text className="font-archivo_700 text-base text-heading">
              Carregando informações!
            </Text>
          </View>
        ) : (
          <FlatList
            data={licenses}
            className="w-full max-w-[85%] -mt-4"
            keyExtractor={(item) => String(item.key)}
            renderItem={({ item }) => {
              const timeLeftFormatted = formatTimeLeft(item.expiresAt);

              return (
                <ProfileCard
                  name={item.user?.name}
                  lastName={item.user?.lastName}
                  licenseKey={item.key}
                  createdAt={dayjs(item.createdAt).format(
                    'DD/MM/YYYY [às] H:mm A'
                  )}
                  expiresAt={timeLeftFormatted}
                  onPress={() => {
                    try {
                      deleteLicense(item.id);
                    } catch (error) {
                      console.error('Erro ao deletar licença!', error);
                    }
                  }}
                />
              );
            }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        )}
      </ScrollView>
    </View>
  );
}

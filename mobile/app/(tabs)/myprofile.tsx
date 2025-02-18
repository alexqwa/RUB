import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import avatarImg from '@/src/assets/profile.png';

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
    <View className="bg-[#F0F0F7] flex-1 items-center">
      <Header title="Meu perfil" />
      <View className="bg-shapes-purple items-center justify-center w-full">
        <View className="items-center space-y-6 my-12">
          <View className="relative">
            <Image
              className="rounded-full w-[140px] h-[140px]"
              source={avatarImg}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              className="absolute right-0 bottom-0 w-10 h-10 bg-button-active rounded-full items-center justify-center"
            >
              <Feather name="camera" color="#fff" size={18} />
            </TouchableOpacity>
          </View>
          <View className="items-center">
            <Text className="font-archivo_700 text-white text-2xl">
              {licenses.map((license) => license.user?.name)}
            </Text>
            <Text className="text-[#D4C2FF] font-poppins_400 text-base">
              {licenses.map((license) => license.key)}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView
        className="w-full -mt-4"
        contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#32264D" />
        ) : (
          <FlatList
            className="w-full max-w-[85%]"
            data={licenses}
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

import clsx from 'clsx';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Logo from '@/src/assets/logo.svg';
import Bubbles from '@/src/assets/bubbles.svg';

import { ExitModal } from '@/src/components/ui/ExitModal';
import { useRevenueCat } from '@/src/context/RevenueCatContext';
import { useExitConfirmation } from '@/src/hooks/useExitConfirmation';

export default function SignIn() {
  const { user } = useRevenueCat();
  const { handleCancel, handleExit, modalVisible } = useExitConfirmation();

  const { height } = Dimensions.get('window');
  const viewHeight = height * 0.4;

  return (
    <View className="flex-1 items-center bg-shapes-background">
      <ExitModal
        visible={modalVisible}
        onConfirm={handleExit}
        onCancel={handleCancel}
      />
      <View
        style={{ height: viewHeight }}
        className={`relative bg-shapes-purple_500 w-full items-center justify-center`}
      >
        <Bubbles />
        <View className="absolute top-[45%]">
          <Logo />
        </View>
      </View>
      <View className="w-full max-w-[85%] mt-14 bg-shapes-background">
        <View className="space-y-2">
          <Text className="text-3xl font-poppins_600 text-[#32264D]">
            Acessar conta!
          </Text>
          <Text className="text-[#6A6180] font-poppins_400 text-base">
            Para acessar você precisa de uma{'\n'}assinatura! Caso não tenha,
            {'\n'}compre abaixo!
          </Text>
        </View>
        <View className="mt-10 space-y-3">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/Pricing')}
            className="h-14 rounded-lg bg-shapes-purple_500 items-center flex-row justify-center space-x-2"
          >
            <Feather name="dollar-sign" color="#fff" size={18} />
            <Text className="text-white font-archivo_600 text-base">
              Comprar assinatura
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!user.pro}
            activeOpacity={0.7}
            onPress={() => router.push('/Authentication')}
            className={clsx(
              'h-14 rounded-lg bg-shapes-gray_400 items-center justify-center',
              {
                ['bg-shapes-green_400']: user.pro,
              }
            )}
          >
            {!user.pro ? (
              <View className="flex-row items-center justify-center space-x-3">
                <ActivityIndicator size="small" color="#32264D" />
                <Text className="text-[#9C98A6] font-archivo_600 text-base">
                  Nenhuma assinatura ativa!
                </Text>
              </View>
            ) : (
              <Text
                className={clsx('text-[#9C98A6] font-archivo_600 text-base', {
                  ['text-white']: user.pro,
                })}
              >
                Entrar
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

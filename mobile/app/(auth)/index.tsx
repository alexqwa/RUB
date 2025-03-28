import { router } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  Platform,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import Logo from '@/src/assets/logo.svg';
import Bubbles from '@/src/assets/bubbles.svg';

import { useLicenseKey } from '@/src/hooks/useLicenseKey';

import { useLicense } from '@/src/context/LicenseContext';
import { useRevenueCat } from '@/src/context/RevenueCatContext';

import { Checkbox } from '@/src/components/interactives/Checkbox';
import { ButtonSubmit } from '@/src/components/interactives/ButtonSubmit';

export default function SignIn() {
  const { user } = useRevenueCat();
  const { verifyLicense } = useLicense();
  const {
    licenseKey,
    isChecked,
    handleCheckboxChange,
    handleLicenseKeyChange,
  } = useLicenseKey();

  const [loading, setLoading] = useState(false);
  const { height } = Dimensions.get('window');
  const viewHeight = height * 0.4;

  async function handleVerify() {
    setLoading(true);
    try {
      await verifyLicense(licenseKey);
    } catch (error) {
      console.log('Erro ao verificar a licença. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 items-center bg-shapes-background">
      <KeyboardAvoidingView
        className="flex-1 w-full"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{ alignItems: 'center', paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        >
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
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-3xl font-poppins_600 text-[#32264D]">
                Fazer login
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/(auth)/Onboarding/SignUpUser')}
                activeOpacity={0.7}
                className="mb-2"
              >
                <Text className="text-sm text-[#8257E5] font-poppins_400">
                  Criar uma conta
                </Text>
              </TouchableOpacity>
            </View>
            <View className="space-y-6">
              <TextInput
                editable={!loading}
                value={licenseKey.trim()}
                onChangeText={handleLicenseKeyChange}
                placeholderTextColor="#9C98A6"
                className="h-16 bg-[#FAFAFC] rounded-lg border border-[#E6E6F0] px-6 font-poppins_400 text-sm text-[#6A6180]"
                placeholder="Sua licença"
              />
              <Checkbox
                title="Lembrar-me"
                isChecked={isChecked}
                onPress={() => handleCheckboxChange(!isChecked)}
              />
              <ButtonSubmit
                title="Entrar"
                loading={loading}
                isActive={licenseKey}
                onPress={handleVerify}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

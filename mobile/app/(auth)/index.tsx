import { router } from 'expo-router';
import { useEffect, useState } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

import Bubbles from '@/src/assets/bubbles.svg';

import { Checkbox } from '@/src/components/Checkbox';
import { useLicense } from '@/src/context/LicenseContext';
import { ButtonSubmit } from '@/src/components/interactives/ButtonSubmit';

export default function SignIn() {
  const { verifyLicense } = useLicense();
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [licenseKey, setLicenseKey] = useState('');

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

  async function handleCheckboxChange(newValue: boolean) {
    setIsChecked(newValue);
    if (newValue) {
      try {
        await AsyncStorage.setItem('licenseKey', licenseKey);
      } catch (error) {
        console.error('Error saving license key:', error);
      }
    } else {
      await AsyncStorage.removeItem('licenseKey');
    }
  }

  async function handleLicenseKeyChange(text: string) {
    setLicenseKey(text);
    if (isChecked) {
      try {
        await AsyncStorage.setItem('licenseKey', text);
      } catch (error) {
        console.error('Error saving license key:', error);
      }
    }
  }

  useEffect(() => {
    async function loadLicenseKey() {
      try {
        const storedLicenseKey = await AsyncStorage.getItem('licenseKey');
        if (storedLicenseKey) {
          setLicenseKey(storedLicenseKey);
          setIsChecked(true);
        }
      } catch (error) {
        console.error('Error loading license key:', error);
      }
    }

    loadLicenseKey();
  }, []);

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
            className={`relative bg-shapes-purple w-full items-center justify-center`}
          >
            <Bubbles />
            <Text className="absolute top-[45%] text-center text-white font-rajdhani_700 text-4xl">
              RUB{'\n'}UNLOCKED
            </Text>
          </View>
          <View className="w-full max-w-[85%] mt-14 bg-shapes-background">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-3xl font-poppins_600 text-[#32264D]">
                Fazer login
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/(auth)/Onboarding/signup_user')}
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
                data={licenseKey}
                loading={loading}
                onPress={handleVerify}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

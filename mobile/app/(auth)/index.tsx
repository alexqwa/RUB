import clsx from 'clsx';
import { useState } from 'react';
import {
  View,
  Text,
  Platform,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';

import { Checkbox } from '@/src/components/Checkbox';
import { useLicense } from '@/src/context/LicenseContext';

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
      setLicenseKey('');
      await verifyLicense(licenseKey);
    } catch (error) {
      console.log('Erro ao verificar a licença. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 items-center bg-[#F2F2F2]">
      <KeyboardAvoidingView
        className="flex-1 w-full"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{ alignItems: 'center' }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{ height: viewHeight }}
            className={`bg-shape_purple w-full`}
          />
          <View className="w-full max-w-[90%] mt-14">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-3xl font-poppins_600 text-[#32264D]">
                Fazer login
              </Text>
              <TouchableOpacity activeOpacity={0.7} className="mb-2">
                <Text className="text-sm text-[#8257E5] font-poppins_400">
                  Criar uma conta
                </Text>
              </TouchableOpacity>
            </View>
            <View className="space-y-6">
              <TextInput
                value={licenseKey}
                onChangeText={setLicenseKey}
                placeholderTextColor="#9C98A6"
                className="h-16 bg-[#FAFAFC] rounded-lg border border-[#E6E6F0] px-6 font-poppins_400 text-sm text-[#6A6180]"
                placeholder="Sua licença"
              />
              <Checkbox
                onPress={() => setIsChecked(!isChecked)}
                title="Lembrar-me"
                isChecked={isChecked}
              />
              <TouchableOpacity
                disabled={!licenseKey || loading}
                onPress={handleVerify}
                activeOpacity={0.7}
                className={clsx(
                  'bg-shape_disable h-14 items-center justify-center rounded-lg',
                  {
                    ['bg-shape_active']: licenseKey,
                  }
                )}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#32264D" />
                ) : (
                  <Text
                    className={clsx('text-[#9C98A6] font-poppins_600 text-lg', {
                      ['text-white']: licenseKey,
                    })}
                  >
                    Entrar
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

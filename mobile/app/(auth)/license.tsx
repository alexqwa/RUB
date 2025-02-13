import clsx from 'clsx';
import { useState } from 'react';
import { router } from 'expo-router';
import {
  View,
  Text,
  Platform,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';

import { Header } from '@/src/components/Header';
import { Checkbox } from '@/src/components/Checkbox';
import { useLicense } from '@/src/context/LicenseContext';

export default function License() {
  const { verifyLicense } = useLicense();
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [licenseKey, setLicenseKey] = useState('');

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
    <View className="bg-background flex-1 items-center">
      <Header title="Autenticação" />
      <KeyboardAvoidingView
        className="flex-1 w-full"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 'auto',
            alignItems: 'center',
            marginBottom: 'auto',
          }}
        >
          <View className="flex-1 w-full max-w-[90%]">
            <View className="space-y-2 mb-10">
              <View className="flex-row justify-between items-center">
                <Text className="text-green-500 font-poppins_600 text-4xl">
                  Fazer login
                </Text>
                <TouchableOpacity
                  onPress={() => router.push('/(auth)')}
                  activeOpacity={0.7}
                >
                  <Text className="font-poppins_400 text-sm mb-2 text-green-300">
                    Criar uma conta
                  </Text>
                </TouchableOpacity>
              </View>
              <Text className="text-white font-poppins_500 text-base">
                Para que você possa prosseguir, precisamos{'\n'}que digite sua
                licença de acesso.
              </Text>
            </View>
            <View className="w-full space-y-6">
              <TextInput
                value={licenseKey}
                onChangeText={setLicenseKey}
                placeholder="Digite sua licença"
                placeholderTextColor="#8D8D99"
                selectionColor="#F7DD43"
                className="bg-foreground text-white font-poppins_400 rounded-md px-4 h-13 border border-outline"
              />
              <View className="flex-row justify-between items-center">
                <Checkbox
                  onPress={() => setIsChecked(!isChecked)}
                  title="Lembrar-me"
                  isChecked={isChecked}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                disabled={!licenseKey || loading}
                onPress={handleVerify}
                className={clsx(
                  'bg-yelp h-13 rounded-lg items-center justify-center transition-all',
                  {
                    ['bg-[#cab332]']: !licenseKey,
                  }
                )}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#202024" />
                ) : (
                  <Text className="font-rajdhani_700 uppercase text-base">
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

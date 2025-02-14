import clsx from 'clsx';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

import { api } from '@/src/lib/axios';

export default function SignUpLicense() {
  const insets = useSafeAreaInsets();
  const [licenseKey, setLicenseKey] = useState('');
  const { name, lastName } = useLocalSearchParams();
  const [message, setMessage] = useState('');

  async function handleCreateUser() {
    try {
      const response = await api.post('/users', {
        name,
        lastName,
        licenseKey,
      });

      if (response.status === 201) {
        router.replace('/(auth)/signup_finished');
      } else {
        alert('Erro ao criar usuário: ' + response.data.message);
      }
    } catch (error) {
      console.error('Erro ao criar usuário: ', error);
      Alert.alert(
        'Ocorreu um erro ao tentar criar o usuário. Tente novamente mais tarde.'
      );
    }
  }

  return (
    <View className="flex-1 w-full bg-shape_background items-center">
      <KeyboardAvoidingView className="w-full max-w-[85%]">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: insets.top * 2 }}>
            <View className="flex-row items-center justify-between mb-28">
              <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.7}
                className="w-10 h-10 items-left justify-center"
              >
                <Feather name="arrow-left" size={24} color="#9C98A6" />
              </TouchableOpacity>
              <View className="flex-row space-x-2">
                <View className="w-2 h-2 rounded-full bg-[#C1BCCC]" />
                <View className="w-2 h-2 rounded-full bg-shape_purple" />
              </View>
            </View>
            <View className="space-y-3 mb-32">
              <Text className="text-4xl text-heading font-poppins_600">
                Crie sua{'\n'}conta gratuíta
              </Text>
              <Text className="text-subtitle text-base font-poppins_400 leading-6">
                Basta preencher esses dados{'\n'}e você estará conosco.
              </Text>
            </View>
            <View className="space-y-6">
              <Text className="text-heading font-poppins_600 text-2xl">
                02. Licença
              </Text>
              <View>
                <TextInput
                  value={licenseKey.trim()}
                  onChangeText={setLicenseKey}
                  placeholder="Licença"
                  placeholderTextColor="#9C98A6"
                  className="bg-[#FAFAFC] h-16 font-poppins_400 px-6 text-subtitle   rounded-lg border border-[#E6E6F0]"
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                disabled={!licenseKey}
                onPress={handleCreateUser}
                className={clsx(
                  'h-14 bg-shape_disable rounded-lg items-center justify-center',
                  {
                    ['bg-shape_active']: licenseKey,
                  }
                )}
              >
                <Text
                  className={clsx('text-[#9C98A6] font-poppins_600 text-base', {
                    ['text-white']: licenseKey,
                  })}
                >
                  Concluir cadastro
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

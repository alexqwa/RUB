import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  View,
  Text,
  Alert,
  Platform,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import { api } from '@/src/lib/axios';
import { ButtonSubmit } from '@/src/components/interactives/ButtonSubmit';

export default function SignUpLicense() {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [licenseKey, setLicenseKey] = useState('');
  const { name, lastName } = useLocalSearchParams();

  async function handleCreateUser() {
    setLoading(true);
    try {
      setLicenseKey('');
      const response = await api.post('/users', {
        name,
        lastName,
        licenseKey,
      });

      if (response.status === 201) {
        router.replace('/(auth)/Onboarding/SignUpFinished');
      } else {
        console.log('Erro ao criar usuário: ' + response.data.message);
      }
    } catch (error) {
      console.log('Erro ao criar usuário: ', error);
      Alert.alert(
        'Ocorreu um erro ao tentar criar o usuário. Tente novamente mais tarde.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 w-full bg-shapes-gray_200 items-center">
      <KeyboardAvoidingView
        className="w-full max-w-[85%] flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
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
                <View className="w-2 h-2 rounded-full bg-shapes-gray_500" />
                <View className="w-2 h-2 rounded-full bg-shapes-purple_800" />
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
              <View className="space-y-2">
                <TextInput
                  value={licenseKey.trim()}
                  onChangeText={setLicenseKey}
                  placeholder="Licença"
                  placeholderTextColor="#9C98A6"
                  className="bg-white h-16 font-poppins_400 px-6 text-subtitle rounded-lg border border-shapes-gray_400"
                />
                <View className="flex-row space-x-1">
                  <Text className="text-subtitle font-poppins_400 text-sm">
                    Não tenho uma licença!
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => router.push('/(auth)/Onboarding/Pricing')}
                  >
                    <Text className="text-heading font-poppins_600 text-sm underline">
                      Comprar agora.
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <ButtonSubmit
                title="Concluir cadastro"
                data={licenseKey}
                loading={loading}
                onPress={handleCreateUser}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

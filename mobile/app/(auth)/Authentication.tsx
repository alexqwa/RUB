import { useState } from 'react';
import { router } from 'expo-router';
import {
  View,
  Text,
  Platform,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import { Header } from '@/src/components/ui/Header';
import { ButtonSubmit } from '@/src/components/interactives/ButtonSubmit';

export default function Authentication() {
  const [registerNumber, setRegisterNumber] = useState('');

  return (
    <View className="bg-shapes-gray_200 flex-1 items-center">
      <Header title="Autenticação" />
      <KeyboardAvoidingView
        className="flex-1 w-full"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            marginTop: 'auto',
            marginBottom: 'auto',
          }}
          className="flex-1 w-full"
        >
          <View className="flex-1 w-full max-w-[85%]">
            <View className="space-y-3">
              <Text className="text-3xl font-poppins_600 text-[#32264D]">
                Fazer login
              </Text>
              <Text className="text-[#6A6180] font-poppins_400 text-base">
                Faça as mudanças necessárias{'\n'}para que o seu departamento
                fique
                {'\n'}sempre no verde!
              </Text>
            </View>

            <View className="space-y-3 w-full mt-10">
              <View className="h-16 bg-[#FAFAFC] rounded-lg border border-[#E6E6F0] px-6 font-poppins_400 text-sm text-[#6A6180] flex-row items-center justify-between">
                <Text className="text-[#6A6180] font-poppins_400">
                  http://10.12.223.223:4280
                </Text>
                <View className="bg-green-500 rounded-full h-2 w-2" />
              </View>
              <TextInput
                value={registerNumber.trim()}
                onChangeText={setRegisterNumber}
                placeholderTextColor="#8D8D99"
                placeholder="Digite seu CPF"
                keyboardType="number-pad"
                className="h-16 bg-[#FAFAFC] rounded-lg border border-[#E6E6F0] px-6 font-poppins_400 text-sm text-[#6A6180]"
              />
              <ButtonSubmit
                onPress={() => router.push('/(home)')}
                title="Conectar-se ao sevidor"
                isActive={registerNumber}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

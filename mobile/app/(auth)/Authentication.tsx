import clsx from 'clsx';
import { useState } from 'react';
import { router } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { Header } from '@/src/components/Header';

export default function Authentication() {
  const [registerNumber, setRegisterNumber] = useState('');

  return (
    <View className="bg-shapes-gray_200 flex-1">
      <Header title="Autenticação" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
        className="flex-1 w-full mt-14"
      >
        <View className="flex-1 w-full max-w-[85%]">
          <View className="space-y-3">
            <Text className="text-3xl font-poppins_600 text-[#32264D]">
              Fazer login
            </Text>
            <Text className="text-[#6A6180] font-poppins_400 text-base">
              Faça as mudanças necessárias{'\n'}para que o seu departamento
              fique{'\n'}sempre no verde!
            </Text>
          </View>

          <View className="space-y-3 w-full mt-10">
            <View className="h-16 bg-[#FAFAFC] rounded-xl border border-[#E6E6F0] px-6 font-poppins_400 text-sm text-[#6A6180] flex-row items-center justify-between">
              <Text className="text-[#6A6180] text-base font-archivo_400">
                http://10.106.9.18:80
              </Text>
              <View className="bg-green-500 rounded-full h-2 w-2" />
            </View>
            <TextInput
              placeholder="CPF"
              keyboardType="number-pad"
              value={registerNumber.trim()}
              onChangeText={setRegisterNumber}
              placeholderTextColor="#8D8D99"
              className="h-16 bg-[#FAFAFC] rounded-xl border border-[#E6E6F0] px-6 font-archivo_400 text-base text-[#6A6180]"
            />
            <TouchableOpacity
              activeOpacity={0.7}
              disabled={registerNumber.length === 0}
              onPress={() => router.push('/(home)')}
              className={clsx(
                'h-14 rounded-xl bg-shapes-gray_400 items-center justify-center',
                {
                  ['bg-shapes-green_400']: registerNumber.length > 0,
                }
              )}
            >
              <Text
                className={clsx('text-[#9C98A6] font-archivo_600 text-base', {
                  ['text-white']: registerNumber.length > 0,
                })}
              >
                Conectar-se
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

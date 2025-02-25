import clsx from 'clsx';
import { useState } from 'react';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  View,
  Text,
  Platform,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

export default function SignUpUser() {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

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
                <View className="w-2 h-2 rounded-full bg-shapes-purple_800" />
                <View className="w-2 h-2 rounded-full bg-shapes-gray_500" />
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
                01. Quem é você?
              </Text>
              <View>
                <TextInput
                  value={name.trim()}
                  onChangeText={setName}
                  placeholder="Nome"
                  placeholderTextColor="#9C98A6"
                  className="bg-white h-16 font-poppins_400 px-6 text-subtitle rounded-t-lg border border-shapes-gray_400"
                />
                <TextInput
                  value={lastName.trim()}
                  onChangeText={setLastName}
                  placeholder="Sobrenome"
                  placeholderTextColor="#9C98A6"
                  className="bg-white h-16 font-poppins_400 px-6 text-subtitle rounded-b-lg border border-shapes-gray_400 -mt-[1px]"
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                disabled={!name || !lastName}
                onPress={() =>
                  router.push({
                    pathname: '/(auth)/Onboarding/SignUpLicense',
                    params: { lastName, name },
                  })
                }
                className={clsx(
                  'h-14 bg-shapes-gray_400 rounded-lg items-center justify-center',
                  {
                    ['bg-shapes-purple_400']: name && lastName,
                  }
                )}
              >
                <Text
                  className={clsx('text-[#9C98A6] font-archivo_600 text-base', {
                    ['text-white']: name && lastName,
                  })}
                >
                  Próximo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

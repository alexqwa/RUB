import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

import Finished from '@/src/assets/finished.svg';

export default function SignUpFinished() {
  return (
    <View className="flex-1 relative items-center justify-center bg-shapes-purple">
      <Finished />
      <View className="mb-20">
        <Text className="text-white text-center font-poppins_700 text-3xl my-4">
          Cadastro{'\n'}concluído!
        </Text>
        <Text className="text-center font-poppins_400 text-[#D4C2FF]">
          Agora você faz parte da{'\n'}nossa plataforma
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.replace('/(auth)')}
        className="absolute bottom-20 h-14 bg-button-active w-full max-w-[85%] rounded-lg items-center justify-center"
      >
        <Text className="text-white font-poppins_600 text-base">
          Fazer login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

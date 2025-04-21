import { View, Text } from 'react-native';

import Icon from '@/src/assets/warning.svg';

export function Warning() {
  return (
    <View className="flex-row items-center mt-10">
      <Icon />
      <View className="ml-3">
        <Text className="text-[#8257E5] text-sm font-poppins_400">
          Importante!
        </Text>
        <Text className="text-[#A0A0B2] text-sm font-poppins_400">
          Use as funções com segurança.
        </Text>
      </View>
    </View>
  );
}

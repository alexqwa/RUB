import { Feather } from '@expo/vector-icons';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface PriceCardProps extends TouchableOpacityProps {
  title: string;
  price: string;
  timestamp?: string;
  features: string[];
}

export function PriceCard({
  title,
  price,
  features,
  timestamp,
  ...rest
}: PriceCardProps) {
  return (
    <View className="bg-white rounded-lg border border-shapes-gray_400 divide-y-[1px] divide-shapes-gray_400 mt-20">
      <View className="p-6">
        <Text className="font-archivo_700 text-2xl text-heading">{title}</Text>
        <Text className="text-heading font-archivo_700 text-2xl mt-2">
          R$ {price}
          <Text className="text-sm">{timestamp}</Text>
        </Text>
      </View>
      <View className="space-y-2 p-6">
        {features.map((feature, index) => (
          <View key={index} className="flex-row items-center space-x-2">
            <Feather name="check-circle" size={16} color="#8257E5" />
            <Text className="text-subtitle font-poppins_400">{feature}</Text>
          </View>
        ))}
      </View>
      <View className="p-6">
        <TouchableOpacity
          {...rest}
          activeOpacity={0.7}
          className="h-[60px] items-center justify-center bg-shapes-purple_400 rounded-lg"
        >
          <Text className="font-archivo_600 text-white">Assinar agora</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

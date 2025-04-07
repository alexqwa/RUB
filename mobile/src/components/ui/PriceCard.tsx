import { Feather } from '@expo/vector-icons';
import clsx from 'clsx';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface PriceCardProps extends TouchableOpacityProps {
  title: string;
  price: string;
  isActive: boolean;
}

const features = [
  'Suporte 24/7',
  'Remover anúncios',
  'Chat exclusivo para membros',
  'Todo os setores na palma da mão',
];

export function PriceCard({ title, price, isActive, ...rest }: PriceCardProps) {
  return (
    <View className="bg-white rounded-lg border border-shapes-gray_400 divide-y-[1px] divide-shapes-gray_400 mt-6">
      <View className="p-6">
        <Text className="font-archivo_700 text-2xl text-heading">{title}</Text>
        <Text className="text-heading font-archivo_700 text-2xl mt-2">
          {price}
        </Text>
      </View>
      <View className="space-y-2 p-6">
        {features?.map((feature, index) => (
          <View key={index} className="flex-row items-center space-x-2">
            <Feather name="check-circle" size={16} color="#8257E5" />
            <Text className="text-subtitle font-poppins_400">{feature}</Text>
          </View>
        ))}
      </View>
      <View className="p-6">
        <TouchableOpacity
          {...rest}
          disabled={isActive}
          activeOpacity={0.7}
          className={clsx(
            'h-[60px] items-center justify-center bg-shapes-purple_400 rounded-lg',
            {
              ['bg-shapes-green_400']: isActive,
            }
          )}
        >
          <Text className="font-archivo_600 text-white">
            {isActive ? 'Ativa!' : 'Assinar agora'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

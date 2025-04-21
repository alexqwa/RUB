import { Feather } from '@expo/vector-icons';
import clsx from 'clsx';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface StreetProps extends TouchableOpacityProps {
  title: string;
  isActive: boolean;
}

export function Street({ title, isActive, ...rest }: StreetProps) {
  return (
    <View className="w-full mb-2 overflow-hidden flex-row h-13 rounded-xl bg-white border border-shapes-gray_400 divide-x-[1px] divide-shapes-gray_400">
      <View className="flex-1 px-4 justify-center">
        <Text
          numberOfLines={1}
          className="text-heading font-archivo_600 text-sm"
        >
          {title}
        </Text>
      </View>
      <TouchableOpacity
        {...rest}
        disabled={!isActive}
        activeOpacity={0.8}
        className={clsx('px-4 items-center justify-center flex-row space-x-2', {
          ['bg-[#f6f6f6]']: !isActive,
        })}
      >
        <Feather name="edit" size={16} color="#32264d" />
        <Text className="text-sm font-archivo_600 text-heading">
          {isActive ? 'EDITAR' : 'FECHADO'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

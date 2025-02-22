import { Feather } from '@expo/vector-icons';
import clsx from 'clsx';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface DepartamentProps extends TouchableOpacityProps {
  title: string;
  isActive: boolean;
}

export function Departament({ title, isActive, ...rest }: DepartamentProps) {
  return (
    <View className="w-full mb-2 overflow-hidden flex-row h-13 rounded-xl bg-white border border-[#E6E6F0] divide-x-[1px] divide-[#E6E6F0]">
      <View className="w-10 items-center justify-center">
        <View
          className={clsx('h-2 w-2 rounded-full', {
            ['bg-green-500']: isActive,
            ['bg-red-500']: !isActive,
          })}
        />
      </View>
      <View className="flex-1 px-4 justify-center">
        <Text
          numberOfLines={1}
          className="text-heading text-sm font-archivo_600"
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
        <Feather name="external-link" size={16} color="#32264d" />
        <Text className="text-sm font-archivo_600 text-heading">
          {isActive ? 'ABERTO' : 'FECHADO'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

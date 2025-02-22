import clsx from 'clsx';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

interface CheckboxProps extends TouchableOpacityProps {
  title: string;
  isChecked: boolean;
}

export function Checkbox({ title, isChecked, ...rest }: CheckboxProps) {
  return (
    <TouchableOpacity {...rest} activeOpacity={0.7}>
      <View className="flex-row items-center">
        <View
          className={clsx(
            'w-6 h-6 bg-[#FFFFFF] border border-shape_inline rounded-lg items-center justify-center',
            {
              ['bg-[#04D361] border border-[#04D361]']: isChecked,
            }
          )}
        >
          {isChecked ? <Feather name="check" size={16} color="#fff" /> : null}
        </View>
        <Text className="text-[#9C98A6] font-poppins_400 text-sm ml-3">
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

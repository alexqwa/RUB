import clsx from 'clsx';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

interface CheckboxProps extends TouchableOpacityProps {
  label: string;
  checked: boolean;
}

export function Checkbox({ label, checked, ...rest }: CheckboxProps) {
  return (
    <TouchableOpacity activeOpacity={0.85} disabled={checked} {...rest}>
      <Animated.View
        layout={LinearTransition.springify().mass(0.8)}
        className={clsx(
          'bg-white border border-shapes-gray_400 px-6 py-3 rounded-xl flex-row items-center justify-between',
          {
            ['bg-shapes-gray_400 border-[#cbcbd8] pr-3']: checked,
          }
        )}
      >
        <Animated.Text
          layout={LinearTransition}
          className={clsx('text-base font-archivo_700 text-subtitle', {
            ['text-heading']: checked,
          })}
        >
          {label}
        </Animated.Text>
        {checked && (
          <Animated.View
            entering={FadeIn.duration(350)}
            exiting={FadeOut}
            className="ml-2"
          >
            <AntDesign name="checkcircle" size={20} color="#32264d" />
          </Animated.View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

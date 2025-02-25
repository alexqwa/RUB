import clsx from 'clsx';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TouchableOpacityProps,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  data: string;
  title: string;
  loading: boolean;
}

export function ButtonSubmit({ data, title, loading, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.7}
      disabled={!data || loading}
      className={clsx(
        'h-14 rounded-lg bg-shapes-gray_400 items-center justify-center',
        {
          ['bg-shapes-green_400']: data,
        }
      )}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#32264D" />
      ) : (
        <Text
          className={clsx('text-[#9C98A6] font-archivo_600 text-base', {
            ['text-white']: data,
          })}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  back?: boolean;
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle, back }: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        marginTop: Platform.OS === 'android' ? insets.top : null,
        paddingTop: Platform.OS === 'ios' ? insets.top + 24 : 40,
      }}
      className="bg-shapes-purple_500 border-b border-shapes-purple_800 py-10 w-full items-center justify-center"
    >
      <View className="relative max-w-[85%] w-full items-center justify-center">
        {back ? (
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-0"
          >
            <Feather name="arrow-left" size={18} color="#fff" />
          </TouchableOpacity>
        ) : null}

        <Text className="text-white text-base font-archivo_600">
          {title}
          {subtitle ? `: ${subtitle}` : null}
        </Text>
      </View>
    </View>
  );
}

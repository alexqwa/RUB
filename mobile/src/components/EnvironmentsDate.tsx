import { View, Text } from 'react-native';

interface HeaderProps {
  date: string;
  weekday: string;
}

export function EnvironmentsDate({ date, weekday }: HeaderProps) {
  return (
    <View className="items-center w-full justify-between flex-row mb-5">
      <Text className="text-heading font-archivo_700 text-2xl">
        Departamentos
      </Text>
      <View className="flex-col items-end">
        <Text className="text-subtitle font-archivo_400 text-sm">{date}</Text>
        <Text className="text-subtitle font-archivo_400 text-sm">
          {weekday}
        </Text>
      </View>
    </View>
  );
}

import dayjs from 'dayjs';
import { View, Text } from 'react-native';

export function EnvironmentsDate() {
  return (
    <View className="items-center w-full justify-between flex-row mb-5">
      <Text className="text-heading font-archivo_700 text-2xl">
        Departamentos
      </Text>
      <View className="flex-col items-end">
        <Text className="text-subtitle font-archivo_400 text-sm">
          {dayjs().format('DD/MM/YYYY')}
        </Text>
        <Text className="text-subtitle font-archivo_400 text-sm">
          {dayjs().format('dddd').charAt(0).toUpperCase() +
            dayjs().format('dddd').slice(1)}
        </Text>
      </View>
    </View>
  );
}

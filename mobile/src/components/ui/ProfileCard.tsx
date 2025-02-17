import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface ProfileCard extends TouchableOpacityProps {
  name?: string;
  lastName?: string;
  createdAt: string;
  expiresAt: string;
  licenseKey: string;
}

export function ProfileCard({
  name,
  lastName,
  createdAt,
  expiresAt,
  licenseKey,
  ...rest
}: ProfileCard) {
  return (
    <View className="bg-white p-6 rounded-lg border border-[#E6E6F0]">
      <Text className="text-heading font-archivo_600 text-xl">Meus dados</Text>
      <View className="w-full h-[1px] bg-[#E6E6F0] mt-2" />
      <View className="space-y-4 mt-6">
        <View className="space-y-1">
          <Text className="text-[#9C98A6] text-xs font-poppins_400 mb-1">
            Nome
          </Text>
          <View className="h-16 bg-[#FAFAFC] rounded-lg justify-center border border-[#E6E6F0] px-6 font-poppins_400 text-sm text-[#6A6180]">
            <Text className="text-[#6A6180] text-sm font-poppins_400">
              {name}
            </Text>
          </View>
        </View>
        <View className="space-y-1">
          <Text className="text-[#9C98A6] text-xs font-poppins_400 mb-1">
            Sobrenome
          </Text>
          <View className="h-16 bg-[#FAFAFC] rounded-lg justify-center border border-[#E6E6F0] px-6 font-poppins_400 text-sm text-[#6A6180]">
            <Text className="text-[#6A6180] text-sm font-poppins_400">
              {lastName}
            </Text>
          </View>
        </View>
        <View className="space-y-1">
          <Text className="text-[#9C98A6] text-xs font-poppins_400 mb-1">
            Licença
          </Text>
          <View className="h-16 bg-[#FAFAFC] rounded-lg justify-center border border-[#E6E6F0] px-6 font-poppins_400 text-sm text-[#6A6180]">
            <Text
              numberOfLines={1}
              className="text-[#6A6180] text-sm font-poppins_400"
            >
              {licenseKey}
            </Text>
          </View>
        </View>
        <View className="space-y-1">
          <Text className="text-[#9C98A6] text-xs font-poppins_400 mb-1">
            Licença ativa em
          </Text>
          <View className="h-16 bg-[#FAFAFC] rounded-lg justify-center border border-[#E6E6F0] px-6 font-poppins_400 text-sm text-[#6A6180]">
            <Text className="text-[#6A6180] text-sm font-poppins_400">
              {createdAt}
            </Text>
          </View>
        </View>
        <View className="space-y-1">
          <Text className="text-[#9C98A6] text-xs font-poppins_400 mb-1">
            Licença expira em
          </Text>
          <View className="h-16 bg-[#FAFAFC] rounded-lg justify-center border border-[#E6E6F0] px-6 font-poppins_400 text-sm text-[#6A6180]">
            <Text className="text-[#6A6180] text-sm font-poppins_400">
              {expiresAt}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          {...rest}
          activeOpacity={0.7}
          className="bg-[#8257E5] h-14 rounded-lg items-center justify-center"
        >
          <Text className="text-white font-archivo_600 text-base">Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

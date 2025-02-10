import clsx from "clsx"
import { Feather } from "@expo/vector-icons"
import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native"

interface StreetProps extends TouchableOpacityProps {
  title: string
  isActive: boolean
}

export function Street({ title, isActive, ...rest }: StreetProps) {
  return (
    <View className="w-full h-13 flex-row mb-2">
      <View className="w-[40px] rounded-l-lg bg-foreground items-center justify-center border border-outline">
        <View
          className={clsx("rounded-full h-2 w-2", {
            ["bg-green-500"]: isActive === true,
            ["bg-red-500"]: isActive === false,
          })}
        />
      </View>
      <View className="max-w-[60%] bg-foreground w-full justify-center pl-4 border-t-[1px] border-b-[1px] border-outline">
        <Text className="text-white text-base font-rajdhani_700">{title}</Text>
      </View>
      <TouchableOpacity
        {...rest}
        disabled={!isActive}
        activeOpacity={0.7}
        className={clsx(
          "bg-foreground flex-1 rounded-r-lg items-center justify-evenly border border-outline flex-row",
          {
            ["bg-foreground/80"]: isActive === false,
          }
        )}
      >
        <Feather name="edit" size={16} color="#fff" />
        <Text className="text-white font-rajdhani_700">Editar</Text>
      </TouchableOpacity>
    </View>
  )
}

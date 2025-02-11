import clsx from "clsx"
import { Feather } from "@expo/vector-icons"
import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native"

interface DepartamentProps extends TouchableOpacityProps {
  title: string
  isActive: boolean
}

export function Departament({ title, isActive, ...rest }: DepartamentProps) {
  return (
    <View className="w-full h-13 flex-row mb-2">
      <View className="w-[40px] rounded-l-lg bg-foreground items-center justify-center border border-outline">
        <View
          className={clsx("rounded-full h-2 w-2", {
            ["bg-green-500"]: isActive,
            ["bg-red-500"]: !isActive,
          })}
        />
      </View>
      <View className="max-w-[60%] bg-foreground w-full justify-center pl-4 border-t-[1px] border-b-[1px] border-outline">
        <Text className="text-white text-base font-rajdhani_700 uppercase">
          {title}
        </Text>
      </View>
      <TouchableOpacity
        {...rest}
        disabled={!isActive}
        activeOpacity={0.7}
        className={clsx(
          "bg-foreground flex-1 rounded-r-lg items-center justify-evenly border border-outline flex-row",
          {
            ["opacity-70"]: !isActive,
          }
        )}
      >
        <Feather name="external-link" size={16} color="#ffff" />
        <Text className="text-white font-rajdhani_700">Abrir</Text>
      </TouchableOpacity>
    </View>
  )
}

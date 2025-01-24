import { View, Text } from "react-native"

interface LabelProps {
  title: string
  params: string
}

export function Label({ title, params }: LabelProps) {
  return (
    <Text className="text-white/80 text-base py-2 font-rajdhani_700">
      {title} <Text className="text-green-400">{params}</Text>
    </Text>
  )
}

//  às {dayjs(item.createdAt).format("H:mm A")}

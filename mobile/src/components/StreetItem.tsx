import React from 'react';
import { ViewToken, Text, View } from 'react-native';
import Animated, {
  withTiming,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface ListItemProps {
  item: {
    id: number;
  };
  code: number;
  title: string;
  stock: number;
  viewableItems: SharedValue<ViewToken[]>;
}

const StreetItem: React.FC<ListItemProps> = React.memo(
  ({ item, code, title, stock, viewableItems }) => {
    const rStyle = useAnimatedStyle(() => {
      const isVisible = Boolean(
        viewableItems.value
          .filter((item) => item.isViewable)
          .find((viewableItem) => viewableItem.item.id === item.id)
      );

      return {
        opacity: withTiming(isVisible ? 1 : 0),
        transform: [
          {
            scale: withTiming(isVisible ? 1 : 0),
          },
        ],
      };
    }, [viewableItems, item.id]);

    return (
      <Animated.View
        style={rStyle}
        className="w-full mb-2 overflow-hidden flex-row h-[70px] rounded-xl bg-white border border-shapes-gray_400 divide-x-[1px] divide-shapes-gray_400"
      >
        <View className="flex-1 px-4 justify-center">
          <Text className="text-heading text-sm font-archivo_600">
            {code}: {title}
          </Text>
        </View>
        <View className="w-[70px] items-center justify-center">
          <Text className="text-sm text-center font-archivo_600 text-heading">
            {stock}
            {'\n'}
            UN
          </Text>
        </View>
      </Animated.View>
    );
  }
);

export { StreetItem };

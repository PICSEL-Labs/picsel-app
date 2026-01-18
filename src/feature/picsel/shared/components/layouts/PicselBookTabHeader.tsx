import React from 'react';

import { Pressable, Text, View } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import BookIcons from '@/shared/icons/BookIcons';
import PicselPhotoIcons from '@/shared/icons/PicselPhotoIcons';

interface Props {
  activeTab: 'my' | 'book';
  onTabChange: (tab: 'my' | 'book') => void;
  indicatorPosition: SharedValue<number>;
}

const PicselBookTabHeader = ({
  activeTab,
  onTabChange,
  indicatorPosition,
}: Props) => {
  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorPosition.value }],
  }));

  return (
    <View className="relative flex-row items-center border-b border-gray-50">
      <Pressable
        onPress={() => onTabChange('my')}
        className="flex-1 flex-row items-center justify-center space-x-1 py-4"
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
        <PicselPhotoIcons
          shape={activeTab === 'my' ? 'pink' : 'gray'}
          height={24}
          width={24}
        />
        <Text
          className={
            activeTab === 'my'
              ? 'text-primary-pink headline-02'
              : 'text-gray-300 headline-02'
          }>
          내 픽셀
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onTabChange('book')}
        className="flex-1 flex-row items-center justify-center space-x-1 py-4"
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
        <BookIcons
          shape={activeTab === 'book' ? 'fill' : 'gray'}
          height={24}
          width={24}
        />
        <Text
          className={
            activeTab === 'book'
              ? 'text-primary-pink headline-02'
              : 'text-gray-300 headline-02'
          }>
          픽셀북
        </Text>
      </Pressable>

      <Animated.View
        className="absolute bottom-0 h-0.5 w-[167px] bg-pink-500"
        style={indicatorStyle}
      />
    </View>
  );
};

export default PicselBookTabHeader;

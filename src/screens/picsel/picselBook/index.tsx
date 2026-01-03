import React, { useState } from 'react';

import { Pressable, Text, View, useWindowDimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';

import PicselBookEmpty from '@/feature/picsel/picselbook/ui/organisms/myPicsel/MyPicselEmpty';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import BookIcons from '@/shared/icons/BookIcons';
import PicselPhotoIcons from '@/shared/icons/PicselPhotoIcons';

const PicselBookScreen = () => {
  const [activeTab, setActiveTab] = useState<'my' | 'book'>('book');
  const { width: screenWidth } = useWindowDimensions();
  const tabWidth = screenWidth / 2;
  const indicatorWidth = 167;
  const centerOffset = (tabWidth - indicatorWidth) / 2; // 중앙 정렬을 위한 오프셋

  const indicatorPosition = useSharedValue(tabWidth + centerOffset); // 초기값: book 탭 중앙

  const handleTabPress = (tab: 'my' | 'book') => {
    setActiveTab(tab);
    indicatorPosition.value = withTiming(
      tab === 'my' ? centerOffset : tabWidth + centerOffset,
      { duration: 250 },
    );
  };

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: indicatorPosition.value,
        },
      ],
    };
  });

  return (
    <ScreenLayout>
      {/* Tab Header */}
      <View className="relative flex-row items-center border-b border-gray-50">
        <Pressable
          onPress={() => handleTabPress('my')}
          className="flex-1 flex-row items-center justify-center space-x-1 py-4"
          style={({ pressed }) => ({
            opacity: pressed ? 0.7 : 1,
          })}>
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
          onPress={() => handleTabPress('book')}
          className="flex-1 flex-row items-center justify-center space-x-1 py-4"
          style={({ pressed }) => ({
            opacity: pressed ? 0.7 : 1,
          })}>
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

        {/* Animated Indicator */}
        <Animated.View
          className="absolute bottom-0 h-0.5 w-[167px] bg-pink-500"
          style={indicatorStyle}
        />
      </View>

      {/* Content */}
      <View className="flex-1">
        {/* 픽셀북 */}
        {activeTab === 'book' && <PicselBookEmpty />}

        {/* 내 픽셀 */}
        {activeTab === 'my' && (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-400 body-rg-03">내 픽셀 콘텐츠</Text>
          </View>
        )}
      </View>
    </ScreenLayout>
  );
};

export default PicselBookScreen;

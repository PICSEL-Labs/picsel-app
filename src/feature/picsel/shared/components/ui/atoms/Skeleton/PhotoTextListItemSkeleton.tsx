import React, { useEffect, useRef } from 'react';

import { Animated, View } from 'react-native';

import {
  CARD_SHADOW,
  TEXT_LIST_CARD,
} from '@/feature/picsel/picselBook/constants/styles';

const PhotoTextListItemSkeleton = ({
  opacity,
}: {
  opacity: Animated.AnimatedInterpolation<number>;
}) => {
  return (
    <View
      className="mb-3 flex-row items-center space-x-4 self-stretch rounded-xl border border-gray-100 bg-white px-4 py-3"
      style={{
        width: TEXT_LIST_CARD.WIDTH,
        ...CARD_SHADOW,
      }}>
      {/* 이미지 스켈레톤 */}
      <Animated.View
        className="flex-shrink-0 rounded bg-gray-200"
        style={{
          width: TEXT_LIST_CARD.IMAGE_WIDTH,
          height: TEXT_LIST_CARD.IMAGE_HEIGHT,
          opacity,
        }}
      />

      {/* 텍스트 영역 스켈레톤 */}
      <View className="h-[160px] flex-1 justify-between">
        {/* 상단 영역 */}
        <View className="flex-col items-start self-stretch">
          {/* 날짜 스켈레톤 */}
          <Animated.View
            className="h-4 w-20 rounded bg-gray-200"
            style={{ opacity }}
          />

          {/* 제목 스켈레톤 */}
          <Animated.View
            className="mt-2 h-5 w-40 rounded bg-gray-200"
            style={{ opacity }}
          />

          {/* 내용 스켈레톤 - 3줄 */}
          <Animated.View
            className="mt-2 h-4 w-full rounded bg-gray-200"
            style={{ opacity }}
          />
          <Animated.View
            className="mt-1 h-4 w-full rounded bg-gray-200"
            style={{ opacity }}
          />
          <Animated.View
            className="mt-1 h-4 w-3/4 rounded bg-gray-200"
            style={{ opacity }}
          />
        </View>

        {/* 하단 매장명 스켈레톤 */}
        <View className="flex-row items-center justify-end self-stretch">
          <Animated.View
            className="h-4 w-24 rounded bg-gray-200"
            style={{ opacity }}
          />
        </View>
      </View>
    </View>
  );
};

interface Props {
  count?: number;
}

const PhotoTextListSkeleton = ({ count = 4 }: Props) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [shimmerAnim]);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View
      style={{
        alignItems: 'center',
        paddingHorizontal: 21,
        paddingTop: 8,
        paddingBottom: 30,
      }}>
      {Array.from({ length: count }).map((_, index) => (
        <PhotoTextListItemSkeleton
          key={`skeleton-${index}`}
          opacity={opacity}
        />
      ))}
    </View>
  );
};

export default PhotoTextListSkeleton;

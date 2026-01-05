import React, { useEffect, useRef } from 'react';

import { Animated, View } from 'react-native';

const PhotoSkeleton = () => {
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
    <View className="mb-6 px-2" style={{ width: '50%' }}>
      {/* 날짜 스켈레톤 */}
      <Animated.View
        className="mb-2 h-4 w-24 rounded bg-gray-200"
        style={{ opacity }}
      />

      {/* 사진 스켈레톤 - w:160, h:240 */}
      <Animated.View
        className="overflow-hidden rounded-lg bg-gray-200"
        style={{ width: 160, height: 240, opacity }}
      />

      {/* 매장명 스켈레톤 */}
      <Animated.View
        className="mt-2 h-4 w-32 rounded bg-gray-200"
        style={{ opacity }}
      />
    </View>
  );
};

export default PhotoSkeleton;

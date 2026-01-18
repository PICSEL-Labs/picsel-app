import React, { useEffect, useRef } from 'react';

import { Animated, View } from 'react-native';

const PicselBookSkeleton = () => {
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
    <View className="flex flex-col items-center" style={{ width: 80 }}>
      {/* 스켈레톤 아이콘 */}
      <Animated.View
        className="mb-2 h-[72px] w-20 rounded-lg bg-gray-200"
        style={{ opacity }}
      />
      {/* 스켈레톤 제목 */}
      <Animated.View
        className="mb-1 h-4 w-16 rounded bg-gray-200"
        style={{ opacity }}
      />
    </View>
  );
};

export default PicselBookSkeleton;

import React, { useEffect, useRef } from 'react';

import { Animated, View } from 'react-native';

const NicknameSectionSkeleton = () => {
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
      className="flex w-full flex-row items-center px-5 py-2"
      style={{ gap: 8 }}>
      <Animated.View
        className="h-6 w-28 rounded bg-gray-200"
        style={{ opacity }}
      />
      <Animated.View
        className="h-6 w-6 rounded bg-gray-200"
        style={{ opacity }}
      />
    </View>
  );
};

export default NicknameSectionSkeleton;

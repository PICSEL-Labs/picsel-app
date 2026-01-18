import React from 'react';

import { Animated, Text, View } from 'react-native';
import { scale } from 'react-native-size-matters';

import { useFloatingAnimation } from '@/shared/hooks/useFloatingAnimation';
import Tooltip from '@/shared/icons/Tooltip';
import { insetShadow } from '@/shared/styles/shadows';

const BrandFilterTooltip = ({ fadeAnim }: { fadeAnim: Animated.Value }) => {
  const translateY = useFloatingAnimation({
    toValue: 2,
    duration1: 900,
    duration2: 500,
  });

  return (
    <Animated.View
      className="absolute top-[55px] z-10 mx-3 items-center rounded-2xl bg-primary-pink px-3 py-2"
      style={{
        width: scale(220),
        boxShadow: insetShadow.default,
        opacity: fadeAnim,
        transform: [{ translateY }],
      }}>
      <View className="absolute -top-1.5 z-0" style={{ left: 15 }}>
        <Tooltip shape="left" />
      </View>
      <Text className="text-white body-rg-02">
        찾는 브랜드만 쏙 골라볼 수 있어요
      </Text>
    </Animated.View>
  );
};

export default BrandFilterTooltip;

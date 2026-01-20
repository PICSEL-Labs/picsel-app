import React from 'react';

import { View, Text, Animated } from 'react-native';
import { scale } from 'react-native-size-matters';

import BottomRight from '@/assets/icons/tooltip/tooltip-bottom-right.svg';
import { useFloatingAnimation } from '@/shared/hooks/useFloatingAnimation';
import { insetShadow } from '@/shared/styles/shadows';

interface UploadTooltipProps {
  bottom?: number;
}

const UploadTooltip = ({ bottom = 70 }: UploadTooltipProps) => {
  const translateY = useFloatingAnimation({
    toValue: 2,
    duration1: 900,
    duration2: 500,
  });

  return (
    <Animated.View
      className={`absolute bottom-[${bottom}px] right-1 items-center rounded-3xl bg-primary-pink px-3 py-2`}
      style={{
        width: scale(155),
        boxShadow: `${insetShadow.default}, 0 2px 4px 0 rgba(0, 0, 0, 0.20), -2px -4px 12px 0 rgba(255, 255, 255, 0.10)`,
        transform: [{ translateY }],
      }}>
      <Text className="text-white body-rg-02">네컷사진을 올려볼까요?</Text>

      <View className="absolute -bottom-1.5 right-4">
        <BottomRight />
      </View>
    </Animated.View>
  );
};

export default UploadTooltip;

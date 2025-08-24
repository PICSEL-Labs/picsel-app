import React from 'react';

import { View, Text, Animated } from 'react-native';
import { scale } from 'react-native-size-matters';

import { TOOLTIP_CONFIG } from '@/shared/constants/tooltip';
import { useFloatingAnimation } from '@/shared/hooks/useFloatingAnimation';
import Tooltip from '@/shared/icons/Tooltip';
import { useUserStore } from '@/shared/store';
import { boxShadow } from '@/styles/boxShadow';

const LoginTooltip = () => {
  const { userSocialType } = useUserStore();

  const config = TOOLTIP_CONFIG[userSocialType] || TOOLTIP_CONFIG.GOOGLE;
  const translateY = useFloatingAnimation({
    toValue: 2,
    duration1: 900,
    duration2: 500,
  });

  return (
    <Animated.View
      className="absolute top-[75px] z-10 items-center rounded-3xl bg-primary-pink px-3 py-2"
      style={{
        width: scale(195),
        ...boxShadow,
        ...config.offset,
        transform: [{ translateY }],
      }}>
      <View className="absolute -top-1.5 z-0" style={config.tooltipDir}>
        <Tooltip shape={config.shape} />
      </View>
      <Text className="text-white body-rg-02">
        마지막으로 로그인한 계정이에요!
      </Text>
    </Animated.View>
  );
};

export default LoginTooltip;

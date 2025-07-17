import React from 'react';

import { View, Text } from 'react-native';
import { scale } from 'react-native-size-matters';

import { SocialTypes } from '../../types';

import { TOOLTIP_CONFIG } from '@/shared/constants/tooltip';
import Tooltip from '@/shared/icons/Tooltip';
import { boxShadow } from '@/styles/boxShadow';

interface Props {
  type: SocialTypes;
}

const LoginTooltip = ({ type }: Props) => {
  const config = TOOLTIP_CONFIG[type];

  return (
    <View
      className="j absolute top-[72px] z-10 mt-1 items-center rounded-3xl bg-primary-pink px-3 py-2"
      style={{
        width: scale(188),
        ...boxShadow,
        ...config.offset,
      }}>
      <View className="absolute -top-1.5 z-0" style={config.tooltipDir}>
        <Tooltip shape={config.shape} />
      </View>
      <Text className="text-white body-rg-02">
        마지막으로 로그인한 계정이에요!
      </Text>
    </View>
  );
};

export default LoginTooltip;

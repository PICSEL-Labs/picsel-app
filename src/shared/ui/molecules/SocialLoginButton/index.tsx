import React from 'react';

import { Pressable, View } from 'react-native';
import { Text } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

import { SocialTypes } from '@/feature/auth/login/types';
import { TOOLTIP_CONFIG } from '@/shared/constants/tooltip';
import SocialButtons from '@/shared/icons/SocialButtons';
import Tooltip from '@/shared/icons/Tooltip';
import { boxShadow } from '@/styles/boxShadow';
import { commonShadow } from '@/styles/shadow';

interface Props {
  type: SocialTypes;
  isLastLogin: boolean;
  onPressIn: (type: SocialTypes) => void;
}

const SocialLoginButton = ({ type, isLastLogin, onPressIn }: Props) => {
  const config = TOOLTIP_CONFIG[type];

  return (
    <View className="mx-3 items-center">
      <Pressable
        onPressIn={() => onPressIn(type)}
        className="items-center justify-center"
        style={commonShadow}>
        <SocialButtons shape={type} />
      </Pressable>

      {isLastLogin && (
        <View
          className="absolute top-[72px] z-10 mt-1 items-center justify-center rounded-3xl bg-primary-pink"
          style={{
            width: scale(188),
            height: verticalScale(37),
            ...boxShadow,
            ...config.offset,
          }}>
          <View className="absolute -top-1.5 z-0" style={config.tooltipDir}>
            <Tooltip shape={config.shape} />
          </View>
          <Text className="text-center text-white body-rg-02">
            마지막으로 로그인한 계정이에요!
          </Text>
        </View>
      )}
    </View>
  );
};

export default SocialLoginButton;

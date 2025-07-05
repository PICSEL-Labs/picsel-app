import React from 'react';

import { Pressable, View, ViewStyle } from 'react-native';

import { SocialTypes } from '@/feature/auth/login/types';
import SocialButtons from '@/shared/icons/SocialButtons';
import Tooltip from '@/shared/icons/Tooltip';
import { commonShadow } from '@/styles/shadow';

interface Props {
  type: SocialTypes;
  isLastLogin: boolean;
  onPress: (type: SocialTypes) => void;
}

const SocialLoginButton = ({ type, isLastLogin, onPress }: Props) => {
  let tooltipShape: 'left' | 'mid' | 'right' = 'mid';
  let offsetStyle: ViewStyle = {};

  if (type === 'KAKAO') {
    tooltipShape = 'left';
    offsetStyle = { left: 10 };
  } else if (type === 'APPLE') {
    tooltipShape = 'right';
    offsetStyle = { right: 10 };
  }

  return (
    <View className="mx-3 items-center">
      <Pressable
        onPress={() => onPress(type)}
        className="items-center justify-center"
        style={commonShadow}>
        <SocialButtons shape={type} />
      </Pressable>

      {isLastLogin && (
        <View className="absolute top-[72px]" style={offsetStyle}>
          <Tooltip shape={tooltipShape} />
        </View>
      )}
    </View>
  );
};

export default SocialLoginButton;

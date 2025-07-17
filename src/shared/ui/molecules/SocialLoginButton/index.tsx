import React from 'react';

import { Pressable, View } from 'react-native';

import { SocialTypes } from '@/feature/auth/login/types';
import LoginTooltip from '@/feature/auth/login/ui/organisms/LoginTooltip';
import SocialButtons from '@/shared/icons/SocialButtons';
import { commonShadow } from '@/styles/shadow';

interface Props {
  type: SocialTypes;
  isLastLogin: boolean;
  onPressIn: (type: SocialTypes) => void;
}

const SocialLoginButton = ({ type, isLastLogin, onPressIn }: Props) => {
  return (
    <View className="mx-3 items-center">
      <Pressable
        onPressIn={() => onPressIn(type)}
        className="items-center justify-center"
        style={commonShadow}>
        <SocialButtons shape={type} />
      </Pressable>

      {isLastLogin && <LoginTooltip type={type} />}
    </View>
  );
};

export default SocialLoginButton;

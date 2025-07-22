import React from 'react';

import { Pressable, View } from 'react-native';

import { SocialTypes } from '@/feature/auth/login/types';
import LoginTooltip from '@/feature/auth/login/ui/organisms/LoginTooltip';
import SocialButtons from '@/shared/icons/SocialButtons';
import { useUserStore } from '@/shared/store';
import { commonShadow } from '@/styles/shadow';

interface Props {
  type: SocialTypes;
  onPressIn: (type: SocialTypes) => void;
}

const SocialLoginButton = ({ type, onPressIn }: Props) => {
  const { userSocialType } = useUserStore();

  return (
    <View className="mx-3 items-center">
      <Pressable
        onPressIn={() => onPressIn(type)}
        className="items-center justify-center"
        style={commonShadow}>
        <SocialButtons shape={type} />
      </Pressable>

      {userSocialType === type && <LoginTooltip />}
    </View>
  );
};

export default SocialLoginButton;

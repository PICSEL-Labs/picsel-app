import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import { useLoginService } from '@/feature/auth/login/model/loginService';
import { SocialTypes } from '@/feature/auth/login/types';
import LoginIntro from '@/feature/auth/login/ui/organisms/LoginIntro';
import { SignupNavigationProp } from '@/navigation/types/navigateTypeUtil';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import SocialLoginButton from '@/shared/ui/molecules/SocialLoginButton';

const LoginScreen = () => {
  const navigation = useNavigation<SignupNavigationProp>();
  const { handleSocialLogin } = useLoginService(navigation);

  return (
    <ScreenLayout className="bg-primary-black">
      <View className="flex-1">
        <LoginIntro />

        <View className="flex-row justify-center pb-20">
          {(['KAKAO', 'NAVER', 'GOOGLE', 'APPLE'] as SocialTypes[]).map(
            type => (
              <SocialLoginButton
                key={type}
                type={type}
                onPressIn={handleSocialLogin}
              />
            ),
          )}
        </View>
      </View>
    </ScreenLayout>
  );
};

export default LoginScreen;

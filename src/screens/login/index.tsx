import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import { useLoginService } from '@/feature/auth/login/model/loginService';
import { SocialTypes } from '@/feature/auth/login/types';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';
import SocialLoginButton from '@/shared/ui/molecules/SocialLoginButton';
import LoginIntro from '@/shared/ui/organisms/LoginIntro';

const LoginScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { handleSocialLogin } = useLoginService(navigation);

  return (
    <ScreenLayout>
      <View className="flex-1">
        <LoginIntro />

        <View className="flex-row justify-center pt-4">
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

import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable } from 'react-native';

import { loginApi, loginStrategies } from '@/feature/auth/login/api/loginApi';
import {
  LoginRequest,
  LoginResponse,
  SocialTypes,
} from '@/feature/auth/login/types';
import { OnboardingText } from '@/shared/components/common/OnboardingText';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { LOGIN_TEXT } from '@/shared/constants/onboardingText';
import { useUserStore } from '@/shared/store';
import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';

const LoginScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const {
    setSocialAccessToken,
    setAccessToken,
    setRefreshToken,
    setUserSocialType,
    userSocialType,
  } = useUserStore();

  const handleSocialLogin = async (socialType: SocialTypes) => {
    try {
      const socialAccessToken = await loginStrategies[socialType]();
      setSocialAccessToken(socialAccessToken);
      setUserSocialType(socialType);
      await handleLogin({ socialType, socialAccessToken });
    } catch (err) {
      console.error(`${socialType} 로그인 실패:`, err);
    }
  };

  const handleLogin = async (loginPayload: LoginRequest) => {
    try {
      const response = await loginApi(loginPayload);
      console.log('로그인 성공:', response.data);

      if (response.data.signUp) {
        handleSuccessfulLogin(response);
      } else {
        setUserSocialType(response.data.socialType);

        navigation.navigate('SignupRoute');
      }
    } catch (err) {
      console.error('로그인 실패:', err);
    }
  };

  const handleSuccessfulLogin = (response: LoginResponse) => {
    setSocialAccessToken(null);
    setAccessToken(response.data.accessToken);
    setRefreshToken(response.data.refreshToken);
    setUserSocialType(response.data.socialType);

    navigation.navigate('Home');
  };

  return (
    <ScreenLayout>
      <View className="flex-1 justify-center items-center">
        <View className="items-center">
          <OnboardingText text={LOGIN_TEXT} />
          <View className="bg-gray-500 w-[320px] h-[200px] mt-10" />
        </View>

        <View className="flex-row gap-1 pt-10 flex-wrap justify-center">
          {(['KAKAO', 'NAVER', 'GOOGLE', 'APPLE'] as SocialTypes[]).map(
            type => (
              <Pressable
                key={type}
                onPress={() => handleSocialLogin(type)}
                className="bg-gray-400 w-[79px] h-[67px] justify-center items-center mb-2 mx-1">
                <Text className="text-black font-normal text-[20px]">
                  {type === 'KAKAO'
                    ? '카카오톡'
                    : type === 'NAVER'
                    ? '네이버'
                    : type === 'GOOGLE'
                    ? '구글'
                    : '애플'}
                </Text>
              </Pressable>
            ),
          )}
        </View>

        {userSocialType && (
          <View>
            <Text>최근 로그인: {userSocialType}</Text>
          </View>
        )}
      </View>
    </ScreenLayout>
  );
};

export default LoginScreen;

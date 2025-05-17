import React from 'react';

import { AppleButton } from '@invertase/react-native-apple-authentication';
import { Platform, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { loginApi, loginStrategies } from '@/feature/auth/login/api/loginApi';
import {
  LoginRequest,
  LoginResponse,
  SocialTypes,
} from '@/feature/auth/login/types/types';
import { useAuthStore } from '@/store/authStore';

const TestScreen = () => {
  // User Auth State
  const {
    setSocialAccessToken,
    setAccessToken,
    setRefreshToken,
    setSocialType,
  } = useAuthStore();

  // 소셜 로그인 기능
  const handleSocialLogin = async (socialType: SocialTypes) => {
    try {
      // 플랫폼에서 응답으로 받아오는 socialAccessToken
      const socialAccessToken = await loginStrategies[socialType]();

      // 소셜 토큰과 소셜 타입 authStore에 저장
      setSocialAccessToken(socialAccessToken);
      setSocialType(socialType);

      // 비동기적으로 상태가 업데이트 되기 때문에 플랫폼에서 받아온 token을 바로 파라미터로 넣은 후, Login API 요청
      await handleLogin({ socialType, socialAccessToken });
    } catch (err) {
      console.error(`${socialType} 로그인 실패:`, err);
    }
  };

  // 서비스 로그인 기능
  const handleLogin = async (loginPayload: LoginRequest) => {
    try {
      // login api 호출
      const response = await loginApi(loginPayload);

      console.log('로그인 성공:', response);

      response.signUp ? handleSuccessfulLogin(response) : undefined; // 회원가입으로 navigate
    } catch (err) {
      console.error('로그인 실패:', err);
    }
  };

  // 로그인 성공했을 때 action
  const handleSuccessfulLogin = (response: LoginResponse) => {
    setSocialAccessToken(null);
    setAccessToken(response.accessToken);
    setRefreshToken(response.refreshToken);
    // 홈화면으로 navigate
  };

  return (
    <SafeAreaView className="bg-white flex-1 justify-start items-center">
      <View className="space-y-3 flex">
        {/* 소셜 로그인(임시) */}
        <Pressable
          onPress={() => handleSocialLogin('KAKAO')}
          className="bg-yellow-300 p-4 items-center">
          <Text>카카오 로그인</Text>
        </Pressable>

        <Pressable
          onPress={() => handleSocialLogin('NAVER')}
          className="bg-green-300 p-4 items-center">
          <Text>네이버 로그인</Text>
        </Pressable>

        <Pressable
          onPress={() => handleSocialLogin('GOOGLE')}
          className="bg-slate-400 p-4 items-center">
          <Text>구글 로그인</Text>
        </Pressable>

        {/* Apple 로그인은 ios에서만 제공 */}
        {Platform.OS === 'ios' && (
          <AppleButton
            buttonStyle={AppleButton.Style.WHITE}
            buttonType={AppleButton.Type.SIGN_IN}
            style={{
              width: 160,
              height: 45,
            }}
            onPress={() => handleSocialLogin('APPLE')}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default TestScreen;

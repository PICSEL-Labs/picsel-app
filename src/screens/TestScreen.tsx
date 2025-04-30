import React, { useState } from 'react';

import { login } from '@react-native-kakao/user';
import NaverLogin from '@react-native-seoul/naver-login';
import { Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TestScreen = () => {
  const [kakaoResult, setKakaoResult] = useState('');
  const [naverResult, setNaverResult] = useState('');

  // 카카오 로그인
  const handleKakaoLogin = async () => {
    try {
      const token = await login();
      setKakaoResult(JSON.stringify(token));
    } catch (err) {
      console.error('login err', err);
    }
  };

  // 네이버 로그인
  const handleNaverLogin = async () => {
    try {
      const successResponse = await NaverLogin.login();
      setNaverResult(JSON.stringify(successResponse));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1 justify-center items-center">
      {/* 소셜 로그인(임시) */}
      <Pressable onPress={handleKakaoLogin} className="bg-yellow-300 p-4">
        <Text>카카오 로그인</Text>
      </Pressable>

      <Text className="text-black font-bold text-base">
        kakao res: {kakaoResult}
      </Text>

      <Pressable onPress={handleNaverLogin} className="bg-green-300 p-4">
        <Text>네이버 로그인</Text>
      </Pressable>
      <Text className="text-black font-bold text-base">
        naver res: {naverResult}
      </Text>
    </SafeAreaView>
  );
};

export default TestScreen;

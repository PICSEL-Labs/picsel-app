import React, { useState } from 'react';

import { login } from '@react-native-kakao/user';
import { Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TestScreen = () => {
  const [kakaoResult, setKakaoResult] = useState('');

  // 카카오 로그인
  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = await login();
      setKakaoResult(JSON.stringify(token));
    } catch (err) {
      console.error('login err', err);
    }
  };

  // 카카오 response
  console.log(kakaoResult);

  return (
    <SafeAreaView className="bg-white flex-1 justify-center items-center">
      {/* 카카오 로그인(임시) */}
      <Pressable onPress={signInWithKakao} className="bg-yellow-300 p-4">
        <Text>카카오 로그인</Text>
      </Pressable>

      <Text className="text-black font-bold text-base">
        kakao res: {kakaoResult}
      </Text>
    </SafeAreaView>
  );
};

export default TestScreen;

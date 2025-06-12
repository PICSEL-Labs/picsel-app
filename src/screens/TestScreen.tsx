import React from 'react';

import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuthStore } from '@/store/authStore';

const TestScreen = () => {
  const { refreshToken, accessToken, socialType } = useAuthStore();

  console.log(
    'accessToken:',
    accessToken,
    'refreshToken11',
    refreshToken,
    'socialType',
    socialType,
  );

  return (
    <SafeAreaView className="bg-white flex-1 justify-center items-center">
      <Text>로그인 성공</Text>
    </SafeAreaView>
  );
};

export default TestScreen;

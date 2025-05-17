import React, { useState } from 'react';

import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { signupApi } from '@/feature/auth/signup/api/signupApi';
import { validateUserInfoApi } from '@/feature/auth/signup/api/validateApi';
import { ValidationType } from '@/feature/auth/signup/types/types';
import { useAuthStore } from '@/store/authStore';

const SignupScreen = () => {
  const [userId, setUserId] = useState('');
  const [userNickname, setUserNickname] = useState('');

  // user auth
  const { socialType, socialAccessToken } = useAuthStore();

  // 유저 아이디, 닉네임 유효성 검증
  const handleValidation = async (type: ValidationType, value: string) => {
    if (type === 'user-id') setUserId(value);
    if (type === 'nickname') setUserNickname(value);

    try {
      const response =
        type === 'user-id'
          ? await validateUserInfoApi('user-id', value)
          : await validateUserInfoApi('nickname', value);

      console.log(response.message);
    } catch (err) {
      console.log(err);
    }
  };

  // 회원가입 API
  const handleSignup = async () => {
    try {
      const response = await signupApi({
        socialAccessToken,
        socialType,
        userId,
        userNickname,
        userAgreementConsentRequestDto: {
          ageConsent: true,
          termsOfService: true,
          privacyPolicy: true,
          locationConsent: true,
          marketingConsent: true,
        },
      });

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1 justify-start items-center">
      <View className="flex w-[50%] space-y-3">
        <TextInput
          value={userId}
          className="border-black border p-2"
          placeholder="id"
          onChangeText={id => handleValidation('user-id', id)}
        />
        <TextInput
          className="border-black border p-2"
          placeholder="nickname"
          value={userNickname}
          onChangeText={nickname => handleValidation('nickname', nickname)}
        />

        <Pressable onPress={handleSignup}>
          <Text>회원가입 테스트</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;

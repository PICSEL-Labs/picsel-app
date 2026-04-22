import React from 'react';

import { Text, View } from 'react-native';

import { SOCIAL_TYPE_LABEL } from '../../../constants/socialType';

import { SocialTypes } from '@/feature/auth/login/types';

interface Props {
  socialType: SocialTypes;
  email: string;
}

const LoginInfoSection = ({ socialType, email }: Props) => {
  const socialLabel = SOCIAL_TYPE_LABEL[socialType];

  return (
    <View className="flex flex-col items-start self-stretch px-4 pt-6">
      <Text className="pb-2 text-gray-900 headline-02">로그인 정보</Text>
      <View className="flex flex-col items-start self-stretch rounded-xl bg-gray-50 py-4 pl-5 pr-4">
        <Text className="text-gray-900 headline-01">
          <Text className="text-gray-900 headline-01-eb">
            {socialLabel}계정
          </Text>
          <Text className="text-gray-900 headline-01">으로 가입</Text>
        </Text>
        <Text className="text-gray-600 headline-01">{email}</Text>
      </View>
    </View>
  );
};

export default LoginInfoSection;

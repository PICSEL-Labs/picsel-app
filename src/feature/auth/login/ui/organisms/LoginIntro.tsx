import React from 'react';

import { View } from 'react-native';

import { HighlightedText } from '@/shared/components/HighlightedText';
import { LOGIN_TEXT } from '@/shared/constants/text/onboardingText';

const LoginIntro = () => {
  return (
    <View className="items-center justify-center px-6 pb-10 pt-20">
      <HighlightedText text={LOGIN_TEXT} font="title-05 mb-14" />
      <View className="h-[280px] w-[220px] rounded-3xl bg-gray-300" />
    </View>
  );
};

export default LoginIntro;

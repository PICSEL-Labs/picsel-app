import React from 'react';

import { View } from 'react-native';

import Button from '@/shared/ui/atoms/Button';

interface Props {
  onLoginPress: () => void;
}

const OnboardingFooter = ({ onLoginPress }: Props) => {
  return (
    <View className="mb-4 items-center">
      <Button
        text="로그인 하러 가기"
        color="active"
        textColor="white"
        onPress={onLoginPress}
      />
    </View>
  );
};

export default OnboardingFooter;

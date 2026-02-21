import React from 'react';

import { RouteProp, useRoute } from '@react-navigation/native';
import { View } from 'react-native';

import SuccessHeader from '@/feature/success/ui/organisms/SuccessHeader';
import { SignupNavigationProps } from '@/navigation/route/signup';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { useUserStore } from '@/shared/store';
import Button from '@/shared/ui/atoms/Button';

const SignupSuccessScreen = () => {
  const route = useRoute<RouteProp<SignupNavigationProps, 'SignupSuccess'>>();
  const { setRefreshToken } = useUserStore();

  return (
    <ScreenLayout className="bg-primary-black">
      <SuccessHeader />

      <View className="mb-4 items-center">
        <Button
          text="시작하기"
          color="white"
          textColor="pink"
          onPressIn={() => setRefreshToken(route.params.refreshToken)}
        />
      </View>
    </ScreenLayout>
  );
};

export default SignupSuccessScreen;

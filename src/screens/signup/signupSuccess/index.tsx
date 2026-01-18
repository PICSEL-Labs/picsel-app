import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import SuccessHeader from '@/feature/success/ui/organisms/SuccessHeader';
import { SignupNavigationProp } from '@/navigation/types/navigateTypeUtil';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import Button from '@/shared/ui/atoms/Button';

const SignupSuccessScreen = () => {
  const navigation = useNavigation<SignupNavigationProp>();

  return (
    <ScreenLayout className="bg-primary-black">
      <SuccessHeader />

      <View className="mb-4 items-center">
        <Button
          text="시작하기"
          color="white"
          textColor="pink"
          onPressIn={() => navigation.navigate('Home')}
        />
      </View>
    </ScreenLayout>
  );
};

export default SignupSuccessScreen;

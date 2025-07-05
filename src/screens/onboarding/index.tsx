import React from 'react';

import { useNavigation } from '@react-navigation/native';

import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';
import OnboardingCarousel from '@/widgets/onboarding/OnboardingCarousel';
import OnboardingFooter from '@/widgets/onboarding/OnboardingFooter';

const OnboardingScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <ScreenLayout>
      <OnboardingCarousel />
      <OnboardingFooter onLoginPress={() => navigation.navigate('Login')} />
    </ScreenLayout>
  );
};

export default OnboardingScreen;

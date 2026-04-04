import React from 'react';

import { useNavigation } from '@react-navigation/native';

import OnboardingCarousel from '@/feature/onboarding/components/OnboardingCarousel';
import OnboardingFooter from '@/feature/onboarding/components/OnboardingFooter';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

const OnboardingScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <ScreenLayout className="bg-primary-black">
      <OnboardingCarousel />
      <OnboardingFooter onLoginPress={() => navigation.navigate('Login')} />
    </ScreenLayout>
  );
};

export default OnboardingScreen;

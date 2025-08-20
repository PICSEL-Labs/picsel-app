import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignupRoute from './route/signup';
import BottomTabBar from './tabs';

import BrandSearchScreen from '@/feature/brand/search/screens';
import LoginScreen from '@/screens/login';
import OnboardingScreen from '@/screens/onboarding';

export type MainNavigationProps = {
  Onboarding: undefined;
  Login: undefined;
  SignupRoute: undefined;
  Home: undefined;
  SearchBrand: undefined;
};

const MainRoute = () => {
  const Stack = createNativeStackNavigator<MainNavigationProps>();

  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />

      <Stack.Screen name="Login" component={LoginScreen} />

      <Stack.Screen name="SignupRoute" component={SignupRoute} />

      <Stack.Screen name="Home" component={BottomTabBar} />

      <Stack.Screen name="SearchBrand" component={BrandSearchScreen} />
    </Stack.Navigator>
  );
};

export default MainRoute;

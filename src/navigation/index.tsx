import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignupRoute from './route/signup';
import BottomTabBar from './tabs';

import LoginScreen from '@/screens/login';
import OnboardingScreen from '@/screens/onboarding';
import StoreSearchScreen from '@/screens/search';

export type MainNavigationProps = {
  Onboarding: undefined;
  Login: undefined;
  SignupRoute: undefined;
  Home: undefined;
  StoreSearch: undefined;
};

const MainRoute = () => {
  const Stack = createNativeStackNavigator<MainNavigationProps>();

  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />

      <Stack.Screen name="Login" component={LoginScreen} />

      <Stack.Screen name="SignupRoute" component={SignupRoute} />

      <Stack.Screen name="Home" component={BottomTabBar} />

      <Stack.Screen name="StoreSearch" component={StoreSearchScreen} />
    </Stack.Navigator>
  );
};

export default MainRoute;

import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabBar from '@/navigation/tabs';
import LoginScreen from '@/screens/login';
import OnboardingScreen from '@/screens/onboarding';
import NicknameInputScreen from '@/screens/signup/nicknameInput';
import BrandSearchScreen from '@/screens/signup/searchBrand';
import SelectBrandScreen from '@/screens/signup/selectBrand';
import SignupSuccessScreen from '@/screens/signup/signupSuccess';

export type SignupNavigationProps = {
  Onboarding: undefined;
  Login: undefined;
  NicknameInput: undefined;
  SelectBrand: undefined;
  BrandSearch: undefined;
  SignupSuccess: undefined;
  Home: undefined;
};

const SignupRoute = () => {
  const Stack = createNativeStackNavigator<SignupNavigationProps>();

  return (
    <Stack.Navigator
      id={undefined}
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />

      <Stack.Screen name="Login" component={LoginScreen} />

      <Stack.Screen name="NicknameInput" component={NicknameInputScreen} />

      <Stack.Screen
        name="SelectBrand"
        component={SelectBrandScreen}
        options={{
          gestureEnabled: false,
        }}
      />

      <Stack.Screen name="BrandSearch" component={BrandSearchScreen} />

      <Stack.Screen
        name="SignupSuccess"
        component={SignupSuccessScreen}
        options={{
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="Home"
        component={BottomTabBar}
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default SignupRoute;

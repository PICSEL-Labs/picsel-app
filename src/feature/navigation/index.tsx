import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './types';

import OnboardingTestScreen from '@/screens/OnboardingTestScreen';
import SignupScreen from '@/screens/SignupScreen';
import TestScreen from '@/screens/TestScreen';

const MainStack = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingTestScreen} />

      <Stack.Screen name="Signup" component={SignupScreen} />

      <Stack.Screen name="Home" component={TestScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;

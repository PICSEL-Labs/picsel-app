import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignupRoute from './route/signup';
import BottomTabBar from './tabs';

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
    <Stack.Navigator
      id={undefined}
      screenOptions={{ headerShown: false }}
      initialRouteName="Home">
      <Stack.Screen name="SignupRoute" component={SignupRoute} />

      <Stack.Screen name="Home" component={BottomTabBar} />

      <Stack.Screen name="StoreSearch" component={StoreSearchScreen} />
    </Stack.Navigator>
  );
};

export default MainRoute;

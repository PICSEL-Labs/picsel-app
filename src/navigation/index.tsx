import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignupRoute from './route/signup';
import BottomTabBar from './tabs';

import QrScreen from '@/screens/qr';
import StoreSearchScreen from '@/screens/search';

export type MainNavigationProps = {
  Onboarding: undefined;
  Login: undefined;
  SignupRoute: undefined;
  Home: undefined;
  StoreSearch: undefined;
  QrScan: undefined;
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

      <Stack.Screen
        name="QrScan"
        component={QrScreen}
        options={{
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainRoute;

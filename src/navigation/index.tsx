import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignupRoute from './route/signup';
import BottomTabBar from './tabs';

import SelectPhotoScreen from '@/screens/picselbook/selectPhoto';
import QrPreviewScreen from '@/screens/qr/preview';
import QrScanScreen from '@/screens/qr/scan';
import StoreSearchScreen from '@/screens/search';

export type MainNavigationProps = {
  Onboarding: undefined;
  Login: undefined;
  SignupRoute: undefined;
  Home: undefined;
  StoreSearch: undefined;
  QrScan: undefined;
  QrPreview: { url: string };
  SelectPhoto: undefined;
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
        component={QrScanScreen}
        options={{
          animation: 'slide_from_bottom',
        }}
      />

      <Stack.Screen name="QrPreview" component={QrPreviewScreen} />

      <Stack.Screen name="SelectPhoto" component={SelectPhotoScreen} />
    </Stack.Navigator>
  );
};

export default MainRoute;

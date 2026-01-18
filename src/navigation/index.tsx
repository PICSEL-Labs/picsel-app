import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignupRoute from './route/signup';
import BottomTabBar from './tabs';

import MonthFolderScreen from '@/screens/picsel/myPicsel/monthFolder';
import YearFolderScreen from '@/screens/picsel/myPicsel/yearFolder';
import PicselBookScreen from '@/screens/picsel/picselBook';
import RegisterPhotoScreen from '@/screens/picsel/picselUpload/registerPhoto';
import SelectPhotoScreen from '@/screens/picsel/picselUpload/selectPhoto';
import QrScanScreen from '@/screens/qr/scan';
import QrViewerScreen from '@/screens/qr/viewer';
import StoreSearchScreen from '@/screens/search';

export type MainNavigationProps = {
  Onboarding: undefined;
  Login: undefined;
  SignupRoute: undefined;
  Home: undefined;
  StoreSearch: undefined;
  QrScan: undefined;
  QrViewer: { url: string };
  SelectPhoto: { variant: 'main' | 'extra' };
  RegisterPhoto: {
    variant?: 'main' | 'extra';
    photoUris?: string[];
  };
  PicselBook: undefined;
  YearFolder: { year: string };
  MonthFolder: { year: string; month: string };
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

      <Stack.Screen name="QrViewer" component={QrViewerScreen} />

      <Stack.Screen name="SelectPhoto" component={SelectPhotoScreen} />

      <Stack.Screen name="RegisterPhoto" component={RegisterPhotoScreen} />

      <Stack.Screen name="PicselBook" component={PicselBookScreen} />

      <Stack.Screen name="YearFolder" component={YearFolderScreen} />

      <Stack.Screen name="MonthFolder" component={MonthFolderScreen} />
    </Stack.Navigator>
  );
};

export default MainRoute;

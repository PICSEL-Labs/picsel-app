import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignupRoute from './route/signup';
import BottomTabBar from './tabs';

import MonthFolderScreen from '@/screens/picsel/myPicsel/monthFolder';
import YearFolderScreen from '@/screens/picsel/myPicsel/yearFolder';
import PicselBookScreen from '@/screens/picsel/picselBook';
import PicselBookFolderScreen from '@/screens/picsel/picselBook/picselBookFolder';
import RegisterPhotoScreen from '@/screens/picsel/picselUpload/registerPhoto';
import SelectPhotoScreen from '@/screens/picsel/picselUpload/selectPhoto';
import QrScanScreen from '@/screens/qr/scan';
import QrViewerScreen from '@/screens/qr/viewer';
import StoreSearchScreen from '@/screens/search';

export type MainNavigationProps = {
  // Auth
  Onboarding: undefined;
  Login: undefined;
  SignupRoute: undefined;

  // Main
  Home: undefined;
  StoreSearch: undefined;

  // QR
  QrScan: undefined;
  QrViewer: { url: string };

  // PicselUpload Flow
  SelectMainPhoto: { variant: 'main' };
  SelectExtraPhoto: { variant: 'extra' };
  RegisterPhoto: undefined;

  // PicselBook
  PicselBook: undefined;
  YearFolder: { year: string };
  MonthFolder: { year: string; month: string };
  PicselBookFolder: undefined;
};

const MainRoute = () => {
  const Stack = createNativeStackNavigator<MainNavigationProps>();

  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{ headerShown: false }}
      initialRouteName="Home">
      {/* Auth */}
      <Stack.Screen name="SignupRoute" component={SignupRoute} />

      {/* Main */}
      <Stack.Screen name="Home" component={BottomTabBar} />
      <Stack.Screen name="StoreSearch" component={StoreSearchScreen} />

      {/* QR */}
      <Stack.Screen
        name="QrScan"
        component={QrScanScreen}
        options={{
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen name="QrViewer" component={QrViewerScreen} />

      {/* PicselUpload Flow */}
      <Stack.Screen
        name="SelectMainPhoto"
        component={SelectPhotoScreen}
        initialParams={{ variant: 'main' }}
      />
      <Stack.Screen
        name="SelectExtraPhoto"
        component={SelectPhotoScreen}
        initialParams={{ variant: 'extra' }}
      />
      <Stack.Screen name="RegisterPhoto" component={RegisterPhotoScreen} />

      {/* PicselBook */}
      <Stack.Screen name="PicselBook" component={PicselBookScreen} />
      <Stack.Screen name="YearFolder" component={YearFolderScreen} />
      <Stack.Screen name="MonthFolder" component={MonthFolderScreen} />
      <Stack.Screen
        name="PicselBookFolder"
        component={PicselBookFolderScreen}
      />
    </Stack.Navigator>
  );
};

export default MainRoute;

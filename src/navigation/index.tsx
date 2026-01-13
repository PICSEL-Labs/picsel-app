import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignupRoute from './route/signup';
import BottomTabBar from './tabs';

import PhotoUploadScreen from '@/screens/photoUpload';
import MonthFolderScreen from '@/screens/picsel/myPicsel/monthFolder';
import YearFolderScreen from '@/screens/picsel/myPicsel/yearFolder';
import PicselBookScreen from '@/screens/picsel/picselBook';
import PicselBookFolderScreen from '@/screens/picsel/picselBook/picselBookFolder';
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
  PhotoUpload: undefined;
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

      <Stack.Screen name="PhotoUpload" component={PhotoUploadScreen} />

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

import React from 'react';

import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MypageRoute, { MypageNavigationProps } from './route/mypage';
import SignupRoute from './route/signup';
import BottomTabBar from './tabs';

import PicselTabScreen from '@/screens/picsel';
import MonthFolderScreen from '@/screens/picsel/myPicsel/monthFolder';
import YearFolderScreen from '@/screens/picsel/myPicsel/yearFolder';
import PicselBookFolderScreen from '@/screens/picsel/picselBook/picselBookFolder';
import PicselDetailScreen from '@/screens/picsel/picselDetail';
import PicselEditScreen from '@/screens/picsel/picselEdit';
import PicselMoveScreen from '@/screens/picsel/picselMove';
import PicselUploadScreen from '@/screens/picsel/picselUpload';
import RegisterPhotoScreen from '@/screens/picsel/picselUpload/registerPhoto';
import SelectPhotoScreen from '@/screens/picsel/picselUpload/selectPhoto';
import QrScanScreen from '@/screens/qr/scan';
import QrViewerScreen from '@/screens/qr/viewer';
import StoreSearchScreen from '@/screens/search';

export type BottomTabNavigationProps = {
  HomeScreen: undefined;
  QRScreen: undefined;
  BookScreen: undefined;
  MyScreen: undefined;
};

export type MainNavigationProps = {
  // Auth
  Onboarding: undefined;
  Login: undefined;
  SignupRoute: undefined;

  // Main
  Home: NavigatorScreenParams<BottomTabNavigationProps>;
  StoreSearch: undefined;

  // QR
  QrScan: undefined;
  QrViewer: { url: string };

  // PicselUpload Flow
  SelectMainPhoto: { variant: 'main'; from?: 'edit' };
  SelectExtraPhoto: { variant: 'extra'; from?: 'edit' };
  RegisterPhoto: undefined;
  PicselUpload: undefined;
  PicselDetail: { picselId: string };
  PicselEdit: { picselId: string };
  PicselMove: { picselIds: string[]; currentPicselbookId?: string };

  // Picsel Tab & Book
  PicselTab: undefined;
  YearFolder: { year: string };
  MonthFolder: { year: string; month: string };
  PicselBookFolder: { bookId: string; bookName: string };
  SelectBookCover: {
    variant: 'cover';
    picselbookId?: string;
  };

  // Mypage
  MypageRoute: NavigatorScreenParams<MypageNavigationProps>;
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
      <Stack.Screen
        name="SelectBookCover"
        component={SelectPhotoScreen}
        initialParams={{ variant: 'cover' }}
      />
      <Stack.Screen name="RegisterPhoto" component={RegisterPhotoScreen} />
      <Stack.Screen name="PicselUpload" component={PicselUploadScreen} />

      {/* Picsel Detail & Edit Flow */}
      <Stack.Screen name="PicselDetail" component={PicselDetailScreen} />
      <Stack.Screen
        name="PicselEdit"
        component={PicselEditScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="PicselMove" component={PicselMoveScreen} />

      {/* Picsel Tab & Book */}
      <Stack.Screen name="PicselTab" component={PicselTabScreen} />
      <Stack.Screen name="YearFolder" component={YearFolderScreen} />
      <Stack.Screen name="MonthFolder" component={MonthFolderScreen} />
      <Stack.Screen
        name="PicselBookFolder"
        component={PicselBookFolderScreen}
      />

      {/* Mypage */}
      <Stack.Screen name="MypageRoute" component={MypageRoute} />
    </Stack.Navigator>
  );
};

export default MainRoute;

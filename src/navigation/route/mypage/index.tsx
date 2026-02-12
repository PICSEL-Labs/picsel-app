import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BrandSearchScreen from '@/screens/brandSearch';
import MypageAccountScreen from '@/screens/mypage/account';
import BrandSettingScreen from '@/screens/mypage/brand';
import EditNicknameScreen from '@/screens/mypage/editNickname';
import InquiryScreen from '@/screens/mypage/inquiry';
import NoticeScreen from '@/screens/mypage/notice';
import NotificationScreen from '@/screens/mypage/notification';
import NotificationSettingScreen from '@/screens/mypage/notification/setting';
import MypageSettingScreen from '@/screens/mypage/setting';
import TeamIntroScreen from '@/screens/mypage/teamIntro';
import WithdrawalScreen from '@/screens/mypage/withdrawal';
import WithdrawalSuccessScreen from '@/screens/mypage/withdrawal/success';

export type MypageNavigationProps = {
  MypageSetting: undefined;
  MypageAccount: undefined;
  MypageWithdrawal: undefined;
  MypageWithdrawalSuccess: undefined;
  EditNicknameScreen: undefined;
  NotificationScreen: undefined;
  NotificationSettingScreen: undefined;
  BrandSettingScreen: undefined;
  BrandSearchScreen: { variant: 'signup' | 'mypage' };
  NoticeScreen: undefined;
  InquiryScreen: undefined;
  TeamIntro: undefined;
};

const MypageRoute = () => {
  const Stack = createNativeStackNavigator<MypageNavigationProps>();

  return (
    <Stack.Navigator
      id={undefined}
      initialRouteName="MypageSetting"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MypageSetting" component={MypageSettingScreen} />
      <Stack.Screen name="MypageAccount" component={MypageAccountScreen} />
      <Stack.Screen name="MypageWithdrawal" component={WithdrawalScreen} />
      <Stack.Screen
        name="MypageWithdrawalSuccess"
        component={WithdrawalSuccessScreen}
      />
      <Stack.Screen name="EditNicknameScreen" component={EditNicknameScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen
        name="NotificationSettingScreen"
        component={NotificationSettingScreen}
      />
      <Stack.Screen name="BrandSettingScreen" component={BrandSettingScreen} />
      <Stack.Screen
        name="BrandSearchScreen"
        component={BrandSearchScreen}
        initialParams={{ variant: 'mypage' }}
      />
      <Stack.Screen name="NoticeScreen" component={NoticeScreen} />
      <Stack.Screen name="InquiryScreen" component={InquiryScreen} />
      <Stack.Screen name="TeamIntro" component={TeamIntroScreen} />
    </Stack.Navigator>
  );
};

export default MypageRoute;

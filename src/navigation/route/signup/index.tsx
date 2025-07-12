import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NicknameInputScreen from '@/screens/signup/nicknameInput';
import BrandSearchScreen from '@/screens/signup/searchBrand';
import SelectBrandScreen from '@/screens/signup/selectBrand';
import SignupSuccessScreen from '@/screens/signup/signupSuccess';

export type SignupNavigationProps = {
  NicknameInput: undefined;
  SelectBrand: undefined;
  BrandSearch: undefined;
  SignupSuccess: undefined;
  Home: undefined;
};

const SignupRoute = () => {
  const Stack = createNativeStackNavigator<SignupNavigationProps>();

  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      {/* 닉네임 입력 & 약관동의 화면 */}
      <Stack.Screen name="NicknameInput" component={NicknameInputScreen} />

      {/* 선호 브랜드 선택 화면 */}
      <Stack.Screen
        name="SelectBrand"
        component={SelectBrandScreen}
        options={{
          gestureEnabled: false, // iOS 스와이프 뒤로가기 방지 & android 설절 필요
        }}
      />

      {/* 브랜드 검색 화면 */}
      <Stack.Screen name="BrandSearch" component={BrandSearchScreen} />

      {/* 회원가입 완료 화면 */}
      <Stack.Screen
        name="SignupSuccess"
        component={SignupSuccessScreen}
        options={{
          gestureEnabled: false, // iOS 스와이프 뒤로가기 방지 & android 설절 필요
        }}
      />
    </Stack.Navigator>
  );
};

export default SignupRoute;

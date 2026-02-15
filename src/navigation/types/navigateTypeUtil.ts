import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { MainNavigationProps } from '@/navigation';
import { MypageNavigationProps } from '@/navigation/route/mypage';
import { SignupNavigationProps } from '@/navigation/route/signup';

export type RootStackNavigationProp =
  NativeStackNavigationProp<MainNavigationProps>;
export type MypageNavigationProp =
  NativeStackNavigationProp<MypageNavigationProps>;
export type SignupNavigationProp =
  NativeStackNavigationProp<SignupNavigationProps>;

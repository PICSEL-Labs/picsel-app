import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { MainNavigationProps } from '@/navigation';
import { SignupNavigationProps } from '@/navigation/route/signup';

export type RootStackNavigationProp =
  NativeStackNavigationProp<MainNavigationProps>;
export type SignupNavigationProp =
  NativeStackNavigationProp<SignupNavigationProps>;

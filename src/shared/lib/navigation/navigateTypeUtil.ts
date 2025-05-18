import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@/feature/navigation/types';

// ✅ 이 유틸을 통해 어느 스크린이든 쉽게 타입 정의 가능
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

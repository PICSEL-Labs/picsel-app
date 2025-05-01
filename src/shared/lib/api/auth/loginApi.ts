import { login } from '@react-native-kakao/user';
import NaverLogin from '@react-native-seoul/naver-login';

import {
  LoginRequest,
  LoginResponse,
  SocialLoginFunction,
  SocialTypes,
} from '@/feature/auth/types/auth';
import { axiosInstance } from '@/shared/lib/api';

// 로그인 API
export const loginApi = async ({
  socialAccessToken,
  socialType,
}: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>('/auth/signin', {
    socialAccessToken,
    socialType,
  });

  return response.data;
};

// 소셜 로그인(종합) API
export const loginStrategies: Record<SocialTypes, SocialLoginFunction> = {
  KAKAO: async () => {
    const response = await login(); // Kakao login
    return response.accessToken;
  },
  NAVER: async () => {
    const response = await NaverLogin.login(); // Naver login
    return response.successResponse.accessToken;
  },
  GOOGLE: async () => {
    // const data = await login(); // Kakao login
    // return data.accessToken;
    return 'test';
  },
  APPLE: async () => {
    // const data = await login(); // Kakao login
    // return data.accessToken;
    return 'test';
  },
};

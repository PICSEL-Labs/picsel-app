import appleAuth from '@invertase/react-native-apple-authentication';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { login } from '@react-native-kakao/user';
import NaverLogin from '@react-native-seoul/naver-login';

import {
  LoginRequest,
  LoginResponse,
  SocialLoginFunction,
  SocialTypes,
} from '../types';

import { axiosInstance } from '@/shared/lib/api/axiosInstance';

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
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn(); // Google login

    return response.data.idToken;
  },
  APPLE: async () => {
    // Apple login
    const appleAuthResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    return appleAuthResponse.identityToken;
  },
};

import { login } from '@react-native-kakao/user';

export const kakaoLogin = async (): Promise<string> => {
  const response = await login();
  return response.accessToken;
};

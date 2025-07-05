import NaverLogin from '@react-native-seoul/naver-login';

export const naverLogin = async (): Promise<string> => {
  const response = await NaverLogin.login();
  return response.successResponse.accessToken;
};

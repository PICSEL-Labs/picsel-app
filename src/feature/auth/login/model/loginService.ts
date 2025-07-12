import { NavigationProp } from '@react-navigation/native';

import { loginApi } from '../api/loginApi';
import { loginStrategies } from '../lib/socialStrategies';
import { LoginRequest, LoginResponse, SocialTypes } from '../types';

import { useUserStore } from '@/shared/store';

export const useLoginService = (navigation: NavigationProp<any>) => {
  const {
    setSocialAccessToken,
    setAccessToken,
    setRefreshToken,
    setUserSocialType,
  } = useUserStore();

  const handleSocialLogin = async (socialType: SocialTypes) => {
    try {
      const socialAccessToken = await loginStrategies[socialType]();

      setSocialAccessToken(socialAccessToken);
      setUserSocialType(socialType);

      await handleLogin({ socialType, socialAccessToken });
    } catch (err) {
      console.error(`${socialType} 로그인 실패:`, err);
    }
  };

  const handleLogin = async (loginPayload: LoginRequest) => {
    try {
      const response = await loginApi(loginPayload);

      if (response.data.signUp) {
        handleSuccessfulLogin(response);
      } else {
        // 회원가입 필요
        setUserSocialType(response.data.socialType);
        navigation.navigate('SignupRoute');
      }
    } catch (err) {
      console.error('로그인 실패:', err);
    }
  };

  const handleSuccessfulLogin = (response: LoginResponse) => {
    navigation.navigate('Home');

    setSocialAccessToken(null);
    setAccessToken(response.data.accessToken);
    setRefreshToken(response.data.refreshToken);
    setUserSocialType(response.data.socialType);
  };

  return {
    handleSocialLogin,
  };
};

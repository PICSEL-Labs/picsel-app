import { loginApi } from '../api/loginApi';
import { loginStrategies } from '../lib/socialStrategies';
import { LoginRequest, LoginResponse, SocialTypes } from '../types';

import { useUserStore } from '@/shared/store';
import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';

export const useLoginService = (navigation: RootStackNavigationProp) => {
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

      handleLogin({ socialType, socialAccessToken });
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
        setTimeout(() => {
          setUserSocialType(response.data.socialType);
        }, 500);

        navigation.navigate('SignupRoute');
      }
    } catch (err) {
      console.error('로그인 실패:', err);
    }
  };

  const handleSuccessfulLogin = (response: LoginResponse) => {
    setAccessToken(response.data.accessToken);
    setRefreshToken(response.data.refreshToken);

    setSocialAccessToken(null);

    setTimeout(() => {
      setUserSocialType(response.data.socialType);
    }, 500);

    navigation.navigate('Home');
  };

  return {
    handleSocialLogin,
  };
};

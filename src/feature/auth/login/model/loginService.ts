import { loginApi, testLoginApi } from '../api/loginApi';
import { loginStrategies } from '../lib/socialStrategies';
import { LoginRequest, LoginResponse, SocialTypes } from '../types';

import { SignupNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { useUserStore } from '@/shared/store';

export const useLoginService = (navigation: SignupNavigationProp) => {
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

        navigation.navigate('NicknameInput');
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

  // TODO: 앱스토어 심사 완료 후 제거
  const handleTestLogin = async () => {
    try {
      const response = await testLoginApi();

      if (response.data.signUp) {
        handleSuccessfulLogin(response);
      } else {
        setTimeout(() => {
          setUserSocialType(response.data.socialType);
        }, 500);

        navigation.navigate('NicknameInput');
      }
    } catch (err) {
      console.error('테스트 로그인 실패:', err);
    }
  };

  return {
    handleSocialLogin,
    handleTestLogin,
  };
};

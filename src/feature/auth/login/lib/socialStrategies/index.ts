import { SocialLoginFunction, SocialTypes } from '../../types';

import { appleLogin } from './apple';
import { googleLogin } from './google';
import { kakaoLogin } from './kakao';
import { naverLogin } from './naver';

export const loginStrategies: Record<SocialTypes, SocialLoginFunction> = {
  KAKAO: kakaoLogin,
  NAVER: naverLogin,
  GOOGLE: googleLogin,
  APPLE: appleLogin,
};

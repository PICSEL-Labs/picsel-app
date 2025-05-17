export type SocialTypes = 'KAKAO' | 'NAVER' | 'GOOGLE' | 'APPLE';
export type SocialLoginFunction = () => Promise<string>;

export interface LoginRequest {
  socialType: SocialTypes;
  socialAccessToken: string;
}

export interface LoginResponse {
  socialType: string;
  accessToken: string;
  refreshToken: string;
  signUp: boolean;
}

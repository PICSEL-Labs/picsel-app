// API
export type SocialTypes = 'KAKAO' | 'NAVER' | 'GOOGLE' | 'APPLE';

export interface LoginRequest {
  socialAccessToken: string;
  socialType: string;
}

export interface LoginResponse {
  socialType: string;
  accessToken: string;
  refreshToken: string;
  signUp: boolean;
}

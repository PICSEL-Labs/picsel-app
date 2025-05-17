export interface AuthState {
  socialAccessToken: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  socialType: string | null;

  setSocialAccessToken: (socialToken: string) => void;
  setSocialType: (socialType: string) => void;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  logout: () => void;
}

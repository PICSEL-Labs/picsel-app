import { create } from 'zustand';

import { AuthState } from './types/auth';

export const useAuthStore = create<AuthState>(set => ({
  socialAccessToken: null,
  accessToken: null,
  refreshToken: null,

  setSocialAccessToken: socialAccessToken => set({ socialAccessToken }),
  setAccessToken: accessToken => set({ accessToken }),
  setRefreshToken: refreshToken => set({ refreshToken }),

  logout: () => set({ accessToken: null, refreshToken: null }),
}));

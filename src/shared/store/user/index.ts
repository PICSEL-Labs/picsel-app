import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { SocialTypes } from '@/feature/auth/login/types';

interface UserState {
  socialAccessToken: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  userSocialType: SocialTypes;

  setUserSocialType: (type: SocialTypes) => void;
  setSocialAccessToken: (token: string | null) => void;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;

  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      socialAccessToken: null as UserState['socialAccessToken'],
      accessToken: null as UserState['accessToken'],
      refreshToken: null as UserState['refreshToken'],
      userSocialType: null as UserState['userSocialType'],

      setUserSocialType: (userSocialType: UserState['userSocialType']) =>
        set({ userSocialType }),
      setSocialAccessToken: (
        socialAccessToken: UserState['socialAccessToken'],
      ) => set({ socialAccessToken }),
      setAccessToken: (accessToken: UserState['accessToken']) =>
        set({ accessToken }),
      setRefreshToken: (refreshToken: UserState['refreshToken']) =>
        set({ refreshToken }),

      logout: () =>
        set({
          socialAccessToken: null,
          accessToken: null,
          refreshToken: null,
          userSocialType: null,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

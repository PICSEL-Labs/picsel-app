import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { SocialTypes } from '@/feature/auth/login/types';

interface UserState {
  socialAccessToken: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  userSocialType: SocialTypes;
  userNickname: string | null;
  email: string | null;

  setUserSocialType: (type: SocialTypes) => void;
  setSocialAccessToken: (token: string | null) => void;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setUserNickname: (nickname: string | null) => void;
  setEmail: (email: string | null) => void;

  logout: () => void;
  withdraw: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      socialAccessToken: null as UserState['socialAccessToken'],
      accessToken: null as UserState['accessToken'],
      refreshToken: null as UserState['refreshToken'],
      userSocialType: null as UserState['userSocialType'],
      userNickname: null as UserState['userNickname'],
      email: null as UserState['email'],

      setUserSocialType: (userSocialType: UserState['userSocialType']) =>
        set({ userSocialType }),
      setSocialAccessToken: (
        socialAccessToken: UserState['socialAccessToken'],
      ) => set({ socialAccessToken }),
      setAccessToken: (accessToken: UserState['accessToken']) =>
        set({ accessToken }),
      setRefreshToken: (refreshToken: UserState['refreshToken']) =>
        set({ refreshToken }),
      setUserNickname: (userNickname: UserState['userNickname']) =>
        set({ userNickname }),
      setEmail: (email: UserState['email']) => set({ email }),

      logout: () =>
        set({
          socialAccessToken: null,
          accessToken: null,
          refreshToken: null,
          userNickname: null,
          email: null,
        }),

      withdraw: () =>
        set({
          socialAccessToken: null,
          accessToken: null,
          refreshToken: null,
          userSocialType: null,
          userNickname: null,
          email: null,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        socialAccessToken: state.socialAccessToken,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        userSocialType: state.userSocialType,
        userNickname: state.userNickname,
        email: state.email,
      }),
    },
  ),
);

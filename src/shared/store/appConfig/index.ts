import { create } from 'zustand';

interface AppConfigState {
  isLatest: boolean;
  setIsLatest: (isLatest: boolean) => void;
}

export const useAppConfigStore = create<AppConfigState>(set => ({
  isLatest: true,
  setIsLatest: (isLatest: boolean) => set({ isLatest }),
}));

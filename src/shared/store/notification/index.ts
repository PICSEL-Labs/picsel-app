import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface NotificationPromptState {
  hasRequestedNotification: boolean;
  _hasHydrated: boolean;
  setHasRequestedNotification: (value: boolean) => void;
  setHasHydrated: (value: boolean) => void;
}

export const useNotificationPromptStore = create<NotificationPromptState>()(
  persist(
    set => ({
      hasRequestedNotification: false,
      _hasHydrated: false,
      setHasRequestedNotification: (hasRequestedNotification: boolean) =>
        set({ hasRequestedNotification }),
      setHasHydrated: (value: boolean) => set({ _hasHydrated: value }),
    }),
    {
      name: 'notification-prompt-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => state => {
        state?.setHasHydrated(true);
      },
      partialize: state => ({
        hasRequestedNotification: state.hasRequestedNotification,
      }),
    },
  ),
);

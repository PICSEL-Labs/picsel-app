import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface NotificationPromptState {
  hasRequestedNotification: boolean;
  setHasRequestedNotification: (value: boolean) => void;
}

export const useNotificationPromptStore = create<NotificationPromptState>()(
  persist(
    set => ({
      hasRequestedNotification: false,
      setHasRequestedNotification: (hasRequestedNotification: boolean) =>
        set({ hasRequestedNotification }),
    }),
    {
      name: 'notification-prompt-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

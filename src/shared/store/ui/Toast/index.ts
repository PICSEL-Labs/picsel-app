import { create } from 'zustand';

interface ToastStore {
  message: string;
  visible: boolean;
  marginBottom: number;
  showToast: (message: string, marginBottom?: number) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastStore>(set => ({
  message: '',
  visible: false,
  marginBottom: 12,

  showToast: (message, marginBottom = 12) =>
    set(state => {
      if (state.visible) {
        return { message, marginBottom };
      }
      return { message, marginBottom, visible: true };
    }),

  hideToast: () => set({ visible: false }),
}));

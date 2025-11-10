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

  showToast: (message: string, marginBottom = 12) => {
    set({ message, visible: true, marginBottom });
  },

  hideToast: () => {
    set({ visible: false });
  },
}));

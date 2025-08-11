import { create } from 'zustand';

interface ToastStore {
  message: string;
  visible: boolean;
  showToast: (msg: string) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastStore>(set => ({
  message: '',
  visible: false,
  showToast: msg => set({ message: msg, visible: true }),
  hideToast: () => set({ visible: false }),
}));

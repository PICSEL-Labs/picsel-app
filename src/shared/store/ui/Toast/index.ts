import { create } from 'zustand';

interface ToastStore {
  message: string;
  visible: boolean;
  marginBottom: number;
  timerId: NodeJS.Timeout | null;
  showToast: (message: string, marginBottom?: number) => void;
  hideToast: () => void;
  setTimerId: (id: NodeJS.Timeout | null) => void;
}

export const useToastStore = create<ToastStore>(set => ({
  message: '',
  visible: false,
  marginBottom: 12,
  timerId: null,

  showToast: (message: string, marginBottom = 12) => {
    set({ message, visible: true, marginBottom });
  },

  hideToast: () => {
    set({ visible: false });
  },

  setTimerId: (id: NodeJS.Timeout | null) => {
    set({ timerId: id });
  },
}));

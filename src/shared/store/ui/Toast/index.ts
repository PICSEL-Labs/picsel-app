import { create } from 'zustand';

interface ToastOptions {
  marginBottom?: number;
  height?: number;
}

interface ToastStore {
  message: string;
  visible: boolean;
  marginBottom: number;
  height: number;
  showToast: (
    message: string,
    optionsOrMarginBottom?: ToastOptions | number,
  ) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastStore>(set => ({
  message: '',
  visible: false,
  marginBottom: 12,
  height: 40,

  showToast: (message, optionsOrMarginBottom) => {
    const options =
      typeof optionsOrMarginBottom === 'number'
        ? { marginBottom: optionsOrMarginBottom }
        : optionsOrMarginBottom;

    set({
      message,
      marginBottom: options?.marginBottom ?? 12,
      height: options?.height ?? 40,
      visible: true,
    });
  },

  hideToast: () => set({ visible: false }),
}));

import { create } from 'zustand';

export interface ConfirmModalConfig {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  isSingleButton?: boolean;
}

interface ConfirmModalStore {
  visible: boolean;
  config: ConfirmModalConfig | null;
  showConfirmModal: (config: ConfirmModalConfig) => void;
  hideConfirmModal: () => void;
  confirm: () => void;
  cancel: () => void;
}

export const useConfirmModalStore = create<ConfirmModalStore>((set, get) => ({
  visible: false,
  config: null,

  showConfirmModal: (config: ConfirmModalConfig) =>
    set({
      visible: true,
      config: {
        confirmText: '확인',
        cancelText: '취소',
        ...config,
      },
    }),

  hideConfirmModal: () =>
    set({
      visible: false,
      config: null,
    }),

  confirm: () => {
    const { config } = get();
    config?.onConfirm?.();
    get().hideConfirmModal();
  },

  cancel: () => {
    const { config } = get();
    config?.onCancel?.();
    get().hideConfirmModal();
  },
}));

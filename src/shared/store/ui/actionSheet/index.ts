import { create } from 'zustand';

import { ActionSheetOption } from '@/shared/ui/molecules/ActionSheet';

export interface ActionSheetConfig {
  options: ActionSheetOption[];
  cancelText?: string;
}

interface ActionSheetStore {
  visible: boolean;
  config: ActionSheetConfig | null;
  showActionSheet: (config: ActionSheetConfig) => void;
  hideActionSheet: () => void;
}

export const useActionSheetStore = create<ActionSheetStore>((set, _get) => ({
  visible: false,
  config: null,
  showActionSheet: config =>
    set({
      visible: true,
      config: {
        cancelText: '취소',
        ...config,
      },
    }),
  hideActionSheet: () =>
    set({
      visible: false,
      config: null,
    }),
}));

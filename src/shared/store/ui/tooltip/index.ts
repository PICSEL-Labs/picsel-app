import { create } from 'zustand';

interface TooltipStore {
  brandTooltipShown: boolean; // 툴팁을 한 번이라도 보여줬는가? (최초 노출 여부 기억)
  setBrandTooltipShown: (visible: boolean) => void;
}

export const useTooltipStore = create<TooltipStore>(set => ({
  brandTooltipShown: false,
  setBrandTooltipShown: visible => set({ brandTooltipShown: visible }),
}));

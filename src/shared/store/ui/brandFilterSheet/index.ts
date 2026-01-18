import { create } from 'zustand';

interface BrandFilterSheetStore {
  visible: boolean;
  showBrandFilterSheet: () => void;
  hideBrandFilterSheet: () => void;
}

export const useBrandFilterSheetStore = create<BrandFilterSheetStore>(set => ({
  visible: false,
  showBrandFilterSheet: () => set({ visible: true }),
  hideBrandFilterSheet: () => set({ visible: false }),
}));

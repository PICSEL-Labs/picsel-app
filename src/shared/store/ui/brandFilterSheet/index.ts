import { create } from 'zustand';

export type BrandFilterSource = 'map' | 'picsel' | 'picselBook';

interface BrandFilterSheetStore {
  visible: boolean;
  source: BrandFilterSource;
  showBrandFilterSheet: (source: BrandFilterSource) => void;
  hideBrandFilterSheet: () => void;
}

export const useBrandFilterSheetStore = create<BrandFilterSheetStore>(set => ({
  visible: false,
  source: 'map',
  showBrandFilterSheet: (source: BrandFilterSource) =>
    set({ visible: true, source }),
  hideBrandFilterSheet: () => set({ visible: false }),
}));

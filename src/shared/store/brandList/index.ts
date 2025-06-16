import { create } from 'zustand';

interface Brand {
  brandId: string;
  name: string;
  description: string;
  iconImageUrl: string;
}

interface BrandStore {
  brandList: Brand[];
  setBrandList: (list: Brand[]) => void;
}

export const useBrandListStore = create<BrandStore>(set => ({
  brandList: [],
  setBrandList: list => set({ brandList: list }),
}));

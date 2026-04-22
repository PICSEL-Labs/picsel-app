import { create } from 'zustand';

import { Brand } from '@/feature/brand/types';

interface BrandStore {
  brandList: Brand[];
  setBrandList: (list: Brand[]) => void;
}

export const useBrandListStore = create<BrandStore>(set => ({
  brandList: [],
  setBrandList: list => set({ brandList: list }),
}));

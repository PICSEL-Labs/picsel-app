import { create } from 'zustand';

interface FilteredBrand {
  brandId: string;
  name: string;
}

interface FilteredBrandStore {
  filteredList: FilteredBrand[];
  filterBrand: (brandId: string, name: string) => boolean;
  resetFilter: () => void;
}

export const useFilteredBrandsStore = create<FilteredBrandStore>(
  (set, get) => ({
    filteredList: [] as FilteredBrand[],

    filterBrand: (brandId, name) => {
      const { filteredList } = get();

      const isSelected = filteredList.some(b => b.brandId === brandId);
      const isOverLimit = filteredList.length >= 5;

      if (isSelected) {
        set({
          filteredList: filteredList.filter(b => b.brandId !== brandId),
        });
        return true;
      }
      if (!isOverLimit) {
        set({
          filteredList: [...filteredList, { brandId, name }],
        });
        return true;
      }

      return false;
    },

    resetFilter: () => {
      set({ filteredList: [] });
    },
  }),
);

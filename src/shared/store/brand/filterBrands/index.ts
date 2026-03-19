import { create } from 'zustand';

interface FilteredBrand {
  brandId: string;
  name: string;
}

interface FilteredBrandStore {
  tempFilteredList: FilteredBrand[];
  filteredList: FilteredBrand[];
  filterBrand: (brandId: string, name: string) => boolean;
  applyFilter: () => void;
  resetFilter: () => void;
  resetTemp: () => void;
  clearAppliedFilter: () => void;
  syncTempFromApplied: () => void;
}

export const useFilteredBrandsStore = create<FilteredBrandStore>(
  (set, get) => ({
    tempFilteredList: [] as FilteredBrand[],
    filteredList: [] as FilteredBrand[],

    filterBrand: (brandId, name) => {
      const { tempFilteredList } = get();

      const isSelected = tempFilteredList.some(b => b.brandId === brandId);
      const isOverLimit = tempFilteredList.length >= 5;

      if (isSelected) {
        set({
          tempFilteredList: tempFilteredList.filter(b => b.brandId !== brandId),
        });
        return true;
      }
      if (!isOverLimit) {
        set({
          tempFilteredList: [...tempFilteredList, { brandId, name }],
        });
        return true;
      }

      return false;
    },

    applyFilter: () => {
      const { tempFilteredList } = get();
      set({ filteredList: [...tempFilteredList] });
    },

    resetFilter: () => {
      set({
        tempFilteredList: [],
        filteredList: [],
      });
    },

    resetTemp: () => {
      set({ tempFilteredList: [] });
    },

    clearAppliedFilter: () => {
      set({
        tempFilteredList: [],
        filteredList: [],
      });
    },

    syncTempFromApplied: () => {
      const { filteredList } = get();
      set({ tempFilteredList: [...filteredList] });
    },
  }),
);

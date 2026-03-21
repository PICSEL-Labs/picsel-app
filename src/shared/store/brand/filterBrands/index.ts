import { create } from 'zustand';

import { BrandFilterSource } from '@/shared/store/ui/brandFilterSheet';

interface FilteredBrand {
  brandId: string;
  name: string;
}

type FilteredListBySource = Record<BrandFilterSource, FilteredBrand[]>;

interface FilteredBrandStore {
  tempFilteredList: FilteredBrand[];
  filteredListBySource: FilteredListBySource;
  filteredList: FilteredBrand[];
  filterBrand: (brandId: string, name: string) => boolean;
  applyFilter: (source: BrandFilterSource) => void;
  resetFilter: () => void;
  resetTemp: () => void;
  clearAppliedFilter: (source: BrandFilterSource) => void;
  syncTempFromApplied: (source: BrandFilterSource) => void;
  getFilteredList: (source: BrandFilterSource) => FilteredBrand[];
}

export const useFilteredBrandsStore = create<FilteredBrandStore>(
  (set, get) => ({
    tempFilteredList: [] as FilteredBrand[],
    filteredListBySource: {
      map: [],
      picsel: [],
      picselBook: [],
    },
    // 하위 호환: map의 filteredList를 기본으로 노출
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

    applyFilter: (source: BrandFilterSource) => {
      const { tempFilteredList, filteredListBySource } = get();
      const newBySource = {
        ...filteredListBySource,
        [source]: [...tempFilteredList],
      };
      set({
        filteredListBySource: newBySource,
        // 하위 호환: map 기준으로 filteredList 유지
        filteredList: newBySource.map,
      });
    },

    resetFilter: () => {
      set({
        tempFilteredList: [],
        filteredListBySource: { map: [], picsel: [], picselBook: [] },
        filteredList: [],
      });
    },

    resetTemp: () => {
      set({ tempFilteredList: [] });
    },

    clearAppliedFilter: (source: BrandFilterSource) => {
      const { filteredListBySource } = get();
      const newBySource: FilteredListBySource = {
        ...filteredListBySource,
        [source]: [],
      };
      set({
        tempFilteredList: [],
        filteredListBySource: newBySource,
        filteredList: newBySource.map,
      });
    },

    syncTempFromApplied: (source: BrandFilterSource) => {
      const { filteredListBySource } = get();
      set({ tempFilteredList: [...filteredListBySource[source]] });
    },

    getFilteredList: (source: BrandFilterSource) => {
      return get().filteredListBySource[source];
    },
  }),
);

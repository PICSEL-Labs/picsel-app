import { create } from 'zustand';

interface SearchSelectedBrandsStore {
  searchSelectedBrandIds: string[];
  setSearchSelectedBrandIds: (ids: string[]) => void;
  clearSearchSelectedBrandIds: () => void;
}

export const useSearchSelectedBrandsStore = create<SearchSelectedBrandsStore>()(
  set => ({
    searchSelectedBrandIds: [],
    setSearchSelectedBrandIds: (ids: string[]) =>
      set({ searchSelectedBrandIds: ids }),
    clearSearchSelectedBrandIds: () => set({ searchSelectedBrandIds: [] }),
  }),
);

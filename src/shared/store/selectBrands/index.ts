import { create } from 'zustand';

interface SelectedBrand {
  brandId: string;
  name: string;
}

interface BrandStore {
  selectedList: SelectedBrand[];
  selectBrand: (id: string, name: string) => void;
  removeBrand: (id: string) => void;
}

export const useSelectedBrandsStore = create<BrandStore>(set => ({
  selectedList: [],
  selectBrand: (brandId, name) =>
    set(state => {
      const isSelected = state.selectedList.some(
        list => list.brandId === brandId,
      );

      if (brandId === 'NONE') {
        return {
          selectedList: isSelected ? [] : [{ brandId: brandId, name }],
        };
      }

      const filtered = state.selectedList.filter(
        list => list.brandId !== 'NONE',
      );

      if (isSelected) {
        return {
          selectedList: filtered.filter(list => list.brandId !== brandId),
        };
      } else {
        return {
          selectedList: [...filtered, { brandId: brandId, name }],
        };
      }
    }),
  removeBrand: brandId =>
    set(state => ({
      selectedList: state.selectedList.filter(list => list.brandId !== brandId),
    })),
}));

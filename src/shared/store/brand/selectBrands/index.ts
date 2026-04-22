import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SelectedBrand {
  brandId: string;
  name: string;
}

interface BrandStore {
  selectedList: SelectedBrand[];
  selectBrand: (brandId: string, name: string) => void;
  removeBrand: (brandId: string) => void;
  resetSelectedBrands: () => void;
}

export const useSelectedBrandsStore = create<BrandStore>()(
  persist(
    set => ({
      selectedList: [] as SelectedBrand[],
      selectBrand: (brandId, name) =>
        set(state => {
          const isSelected = state.selectedList.some(
            list => list.brandId === brandId,
          );

          if (brandId === 'NONE') {
            return {
              selectedList: isSelected ? [] : [{ brandId, name }],
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
              selectedList: [...filtered, { brandId, name }],
            };
          }
        }),

      removeBrand: brandId =>
        set(state => ({
          selectedList: state.selectedList.filter(
            list => list.brandId !== brandId,
          ),
        })),

      resetSelectedBrands: () => set({ selectedList: [] }),
    }),
    {
      name: 'selected-brands-storage', // AsyncStorage key
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

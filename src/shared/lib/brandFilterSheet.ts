import { useBrandFilterSheetStore } from '../store/ui/brandFilterSheet';

export const showBrandFilterSheet = () => {
  useBrandFilterSheetStore.getState().showBrandFilterSheet();
};

export const hideBrandFilterSheet = () => {
  useBrandFilterSheetStore.getState().hideBrandFilterSheet();
};

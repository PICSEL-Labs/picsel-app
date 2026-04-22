import {
  BrandFilterSource,
  useBrandFilterSheetStore,
} from '../store/ui/brandFilterSheet';

export const showBrandFilterSheet = (source: BrandFilterSource) => {
  useBrandFilterSheetStore.getState().showBrandFilterSheet(source);
};

export const hideBrandFilterSheet = () => {
  useBrandFilterSheetStore.getState().hideBrandFilterSheet();
};

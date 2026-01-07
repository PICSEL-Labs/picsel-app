import { useBrandFilterSheetStore } from '../store/ui/brandFilterSheet';

/**
 * 브랜드 필터 시트를 표시합니다.
 */
export const showBrandFilterSheet = () => {
  useBrandFilterSheetStore.getState().showBrandFilterSheet();
};

/**
 * 브랜드 필터 시트를 숨깁니다.
 */
export const hideBrandFilterSheet = () => {
  useBrandFilterSheetStore.getState().hideBrandFilterSheet();
};

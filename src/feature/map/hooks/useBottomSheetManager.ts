import { useCallback, useState } from 'react';

import {
  hideBrandFilterSheet,
  showBrandFilterSheet,
} from '@/shared/lib/brandFilterSheet';

export type BottomSheetType = 'empty' | 'detail' | 'filter';

export const useBottomSheetManager = () => {
  const [emptyBrandVisible, setEmptyBrandVisible] = useState(false);
  const [detailBrandVisible, setDetailBrandVisible] = useState(false);

  const hideAllSheet = useCallback(() => {
    setEmptyBrandVisible(false);
    setDetailBrandVisible(false);
    hideBrandFilterSheet();
  }, []);

  const showSheet = useCallback((type: BottomSheetType) => {
    switch (type) {
      case 'empty':
        setEmptyBrandVisible(true);
        setDetailBrandVisible(false);
        hideBrandFilterSheet();
        break;

      case 'detail':
        setDetailBrandVisible(true);
        setEmptyBrandVisible(false);
        hideBrandFilterSheet();
        break;

      case 'filter':
        showBrandFilterSheet();
        setEmptyBrandVisible(false);
        setDetailBrandVisible(false);
        break;
    }
  }, []);

  const hideSheet = useCallback((type: BottomSheetType) => {
    switch (type) {
      case 'empty':
        setEmptyBrandVisible(false);
        break;
      case 'detail':
        setDetailBrandVisible(false);
        break;
      case 'filter':
        hideBrandFilterSheet();
        break;
    }
  }, []);

  return {
    emptyBrandVisible,
    detailBrandVisible,
    hideAllSheet,
    showSheet,
    hideSheet,
  };
};

import { useCallback, useState } from 'react';

export type BottomSheetType = 'empty' | 'detail' | 'filter'; // 브랜드 찾기 타입 추가

export const useBottomSheetManager = () => {
  const [emptyBrandVisible, setEmptyBrandVisible] = useState(false);
  const [detailBrandVisible, setDetailBrandVisible] = useState(false);
  const [brandFilterVisible, setBrandFilterVisible] = useState(false);

  const hideAllSheet = useCallback(() => {
    setEmptyBrandVisible(false);
    setDetailBrandVisible(false);
    setBrandFilterVisible(false);
  }, []);

  const showSheet = useCallback((type: BottomSheetType) => {
    switch (type) {
      case 'empty':
        setEmptyBrandVisible(true);
        setDetailBrandVisible(false);
        setBrandFilterVisible(false);
        break;

      case 'detail':
        setDetailBrandVisible(true);
        setEmptyBrandVisible(false);
        setBrandFilterVisible(false);
        break;

      case 'filter':
        setBrandFilterVisible(true);
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
        setBrandFilterVisible(false);
        break;
    }
  }, []);

  return {
    emptyBrandVisible,
    detailBrandVisible,
    brandFilterVisible,
    hideAllSheet,
    showSheet,
    hideSheet,
  };
};

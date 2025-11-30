import { useCallback, useState } from 'react';

export type BottomSheetType = 'nearby' | 'detail' | 'filter'; // 브랜드 찾기 타입 추가

export const useBottomSheetManager = () => {
  const [nearbyBrandVisible, setNearbyBrandVisible] = useState(false);
  const [detailBrandVisible, setDetailBrandVisible] = useState(false);
  const [brandFilterVisible, setBrandFilterVisible] = useState(false);

  const hideAllSheet = useCallback(() => {
    setNearbyBrandVisible(false);
    setDetailBrandVisible(false);
    setBrandFilterVisible(false);
  }, []);

  const showSheet = useCallback((type: BottomSheetType) => {
    switch (type) {
      case 'nearby':
        setNearbyBrandVisible(true);
        setDetailBrandVisible(false);
        setBrandFilterVisible(false);
        break;

      case 'detail':
        setDetailBrandVisible(true);
        setNearbyBrandVisible(false);
        setBrandFilterVisible(false);
        break;

      case 'filter':
        setBrandFilterVisible(true);
        setNearbyBrandVisible(false);
        setDetailBrandVisible(false);
        break;
    }
  }, []);

  const hideSheet = useCallback((type: BottomSheetType) => {
    switch (type) {
      case 'nearby':
        setNearbyBrandVisible(false);
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
    nearbyBrandVisible,
    detailBrandVisible,
    brandFilterVisible,
    hideAllSheet,
    showSheet,
    hideSheet,
  };
};

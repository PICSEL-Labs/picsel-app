import { useState, useCallback } from 'react';

export type BottomSheetType = 'nearby' | 'detail';

export const useBottomSheetManager = () => {
  const [nearbyBrandVisible, setNearbyBrandVisible] = useState(false);
  const [detailBrandVisible, setDetailBrandVisible] = useState(false);

  const hideAllSheet = useCallback(() => {
    setNearbyBrandVisible(false);
    setDetailBrandVisible(false);
  }, []);

  const showSheet = useCallback((type: BottomSheetType) => {
    if (type === 'nearby') {
      setDetailBrandVisible(false);
      setNearbyBrandVisible(true);
    } else {
      setNearbyBrandVisible(false);
      setDetailBrandVisible(true);
    }
  }, []);

  const hideSheet = useCallback((type: BottomSheetType) => {
    if (type === 'nearby') {
      setNearbyBrandVisible(false);
    } else {
      setDetailBrandVisible(false);
    }
  }, []);

  return {
    nearbyBrandVisible,
    detailBrandVisible,
    hideAllSheet,
    showSheet,
    hideSheet,
  };
};

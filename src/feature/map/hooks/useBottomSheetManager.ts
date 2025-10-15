import { useState } from 'react';

export type BottomSheetFunc = 'nearby' | 'detail';

export const useBottomSheetManager = () => {
  const [nearbyBrandVisible, setNearbyBrandVisible] = useState(false);
  const [detailBrandVisible, setDetailBrandVisible] = useState(false);

  const hideAllSheet = () => {
    setNearbyBrandVisible(false);
    setDetailBrandVisible(false);
  };

  const showSheet = (func: BottomSheetFunc) => {
    func === 'nearby'
      ? setNearbyBrandVisible(true)
      : setDetailBrandVisible(true);
  };

  const hideSheet = (func: BottomSheetFunc) => {
    func === 'nearby'
      ? setNearbyBrandVisible(false)
      : setDetailBrandVisible(false);
  };

  return {
    nearbyBrandVisible,
    detailBrandVisible,
    setNearbyBrandVisible,
    hideAllSheet,
    showSheet,
    hideSheet,
  };
};

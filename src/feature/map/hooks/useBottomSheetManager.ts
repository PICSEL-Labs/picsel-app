import { useState } from 'react';

export type BottomSheetType = 'detail';

export const useBottomSheetManager = () => {
  const [detailBrandVisible, setDetailBrandVisible] = useState(false);

  const showSheet = () => {
    setDetailBrandVisible(true);
  };

  const hideSheet = () => {
    setDetailBrandVisible(false);
  };

  return {
    detailBrandVisible,
    showSheet,
    hideSheet,
  };
};

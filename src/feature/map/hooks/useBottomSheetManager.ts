import { useState, useCallback } from 'react';

export type BottomSheetType = 'empty' | 'detail';

export const useBottomSheetManager = () => {
  const [emptyBrandVisible, setEmptyBrandVisible] = useState(false);
  const [detailBrandVisible, setDetailBrandVisible] = useState(false);

  const hideAllSheet = useCallback(() => {
    setEmptyBrandVisible(false);
    setDetailBrandVisible(false);
  }, []);

  const showSheet = useCallback((type: BottomSheetType) => {
    if (type === 'empty') {
      setDetailBrandVisible(false);
      setEmptyBrandVisible(true);
    } else {
      setEmptyBrandVisible(false);
      setDetailBrandVisible(true);
    }
  }, []);

  const hideSheet = useCallback((type: BottomSheetType) => {
    if (type === 'empty') {
      setEmptyBrandVisible(false);
    } else {
      setDetailBrandVisible(false);
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

import { useState, useCallback } from 'react';

import { toggleFavoriteBrandApi } from '../api/toggleFavoriteBrandAPi';

export type BottomSheetType = 'nearby' | 'detail';

interface Props {
  isPending?: boolean;
  brandId?: string;
  isFavorite?: boolean;
}

export const useBottomSheetManager = ({
  isPending,
  brandId,
  isFavorite,
}: Props) => {
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

  const handleToggleFavorite = () => {
    if (isPending || !brandId) {
      return;
    }

    toggleFavoriteBrandApi({
      brandId,
      action: isFavorite ? 'REMOVE' : 'ADD',
    });
  };

  return {
    handleToggleFavorite,
    nearbyBrandVisible,
    detailBrandVisible,
    hideAllSheet,
    showSheet,
    hideSheet,
  };
};

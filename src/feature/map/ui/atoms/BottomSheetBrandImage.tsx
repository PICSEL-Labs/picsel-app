import React from 'react';

import BrandImage from '../atoms/BrandImage';
import BrandImageWithFavorite from '../molecules/BrandImageWithFavorite';

import { MapBottomSheetProps } from '@/feature/map/types';

const BottomSheetBrandImage = ({
  imageUrl,
  nearBy = false,
  isFavorite = false,
  brandId,
}: MapBottomSheetProps) => {
  if (brandId) {
    return (
      <BrandImageWithFavorite
        imageUrl={imageUrl}
        brandId={brandId}
        isFavorite={isFavorite}
        nearBy={nearBy}
      />
    );
  }

  return <BrandImage imageUrl={imageUrl} nearBy={nearBy} />;
};

export default BottomSheetBrandImage;

import React from 'react';

import CachedImage from '@/shared/components/CachedImage';
import { getImageUrl } from '@/shared/utils/image';

interface Props {
  imageUrl: string;
}

const BrandImage = ({ imageUrl }: Props) => {
  return (
    <CachedImage
      uri={getImageUrl(imageUrl)}
      style={{ width: 60, height: 60, borderRadius: 30 }}
      resizeMode="cover"
    />
  );
};

export default BrandImage;

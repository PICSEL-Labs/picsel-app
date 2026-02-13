import React from 'react';

import { Image } from 'react-native';

import { getImageUrl } from '@/shared/utils/image';

interface Props {
  imageUrl: string;
}

const BrandImage = ({ imageUrl }: Props) => {
  return (
    <Image
      className="h-[60px] w-[60px] rounded-full"
      source={{ uri: getImageUrl(imageUrl) }}
      resizeMode="cover"
    />
  );
};

export default BrandImage;

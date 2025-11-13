import React from 'react';

import { Image } from 'react-native';
import Config from 'react-native-config';

interface Props {
  imageUrl: string;
}

const BrandImage = ({ imageUrl }: Props) => {
  return (
    <Image
      className="h-[60px] w-[60px] rounded-full"
      source={{ uri: Config.IMAGE_URL + imageUrl }}
      resizeMode="cover"
    />
  );
};

export default BrandImage;

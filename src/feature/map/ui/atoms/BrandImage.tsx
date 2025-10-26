import React from 'react';

import { View, Image } from 'react-native';
import Config from 'react-native-config';

import { defaultShadow } from '@/styles/shadows';

interface Props {
  imageUrl: string;
  nearBy?: boolean;
}

const BrandImage = ({ imageUrl, nearBy = false }: Props) => {
  return (
    <View style={defaultShadow} className={nearBy ? 'items-center' : undefined}>
      <Image
        className="h-[60px] w-[60px] rounded-full"
        source={{ uri: Config.IMAGE_URL + imageUrl }}
        resizeMode="cover"
      />
    </View>
  );
};

export default BrandImage;

import React from 'react';

import { View, Image, Pressable } from 'react-native';
import Config from 'react-native-config';

import { MapBottomSheetProps } from '../../types';

import BrandFavIcons from '@/shared/icons/BrandFav';
import { defaultShadow } from '@/styles/shadows';

const BottomSheetBrandImage = ({
  imageUrl,
  nearBy = false,
  isFavorite,
  brandId,
}: MapBottomSheetProps) => {
  return (
    <View
      id={brandId}
      style={defaultShadow}
      className={nearBy ? 'items-center' : undefined}>
      <Image
        className="h-[60px] w-[60px] rounded-full"
        source={{ uri: Config.IMAGE_URL + imageUrl }}
        resizeMode="cover"
      />

      <Pressable
        className="absolute bottom-0 right-0"
        onPress={() => console.log(brandId)}>
        <BrandFavIcons
          width={23}
          height={23}
          shape={isFavorite ? 'empty' : 'gray'}
        />
      </Pressable>
    </View>
  );
};

export default BottomSheetBrandImage;

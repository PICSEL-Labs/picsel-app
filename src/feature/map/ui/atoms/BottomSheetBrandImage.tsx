import React from 'react';

import { View, Image, Pressable } from 'react-native';
import Config from 'react-native-config';

import { useBottomSheetManager } from '../../hooks/useBottomSheetManager';
import { useToggleFavoriteBrand } from '../../mutations/useToggleFavoriteBrand';
import { MapBottomSheetProps } from '../../types';

import BrandFavIcons from '@/shared/icons/BrandFav';
import { defaultShadow } from '@/styles/shadows';

const BottomSheetBrandImage = ({
  imageUrl,
  nearBy = false,
  isFavorite = false,
  brandId,
}: MapBottomSheetProps) => {
  const { isPending } = useToggleFavoriteBrand();
  const { handleToggleFavorite } = useBottomSheetManager({
    brandId,
    isFavorite,
    isPending,
  });

  return (
    <View style={defaultShadow} className={nearBy ? 'items-center' : undefined}>
      <Image
        className="h-[60px] w-[60px] rounded-full"
        source={{ uri: Config.IMAGE_URL + imageUrl }}
        resizeMode="cover"
      />

      {brandId && (
        <Pressable
          className="absolute bottom-0 right-0"
          onPress={handleToggleFavorite}
          disabled={isPending}>
          <BrandFavIcons
            width={23}
            height={23}
            shape={isFavorite ? 'fill' : 'gray'}
          />
        </Pressable>
      )}
    </View>
  );
};

export default BottomSheetBrandImage;

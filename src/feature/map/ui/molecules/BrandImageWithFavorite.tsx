import React from 'react';

import { View, Image, Pressable } from 'react-native';
import Config from 'react-native-config';

import { useFavoriteToggle } from '../../hooks/useFavoriteToggle';

import BrandFavIcons from '@/shared/icons/BrandFav';
import { defaultShadow, favoriteShadow } from '@/styles/shadows';

interface Props {
  imageUrl: string;
  brandId?: string;
  isFavorite: boolean;
  nearBy?: boolean;
}

const BrandImageWithFavorite = ({
  imageUrl,
  brandId,
  isFavorite,
  nearBy = false,
}: Props) => {
  const { optimisticFavorite, handleToggleFavorite, isPending } =
    useFavoriteToggle({
      brandId,
      isFavorite,
    });

  return (
    <View
      style={optimisticFavorite && !nearBy ? favoriteShadow : defaultShadow}
      className={nearBy ? 'items-center' : undefined}>
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
            shape={optimisticFavorite ? 'fill' : 'gray'}
          />
        </Pressable>
      )}
    </View>
  );
};

export default BrandImageWithFavorite;

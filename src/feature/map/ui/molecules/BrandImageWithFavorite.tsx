import React from 'react';

import { View, Pressable } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { useFavoriteToggle } from '../../hooks/useFavoriteToggle';
import BrandImage from '../atoms/BrandImage';

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

  const shouldShowShadow = optimisticFavorite && !nearBy;

  return (
    <View style={shouldShowShadow ? favoriteShadow : defaultShadow}>
      {shouldShowShadow ? (
        <Shadow
          distance={4}
          startColor="rgba(255, 153, 185, 0.85)"
          offset={[0, 0]}
          paintInside={false}
          style={{ borderRadius: 9999 }}>
          <BrandImage imageUrl={imageUrl} />
        </Shadow>
      ) : (
        <BrandImage imageUrl={imageUrl} />
      )}

      {brandId && (
        <Pressable
          className="absolute bottom-0 right-0"
          onPress={() => handleToggleFavorite(nearBy ? 65 : 75)}
          disabled={isPending}>
          <BrandFavIcons
            width={23}
            height={23}
            shape={optimisticFavorite ? 'empty' : 'gray'}
          />
        </Pressable>
      )}
    </View>
  );
};

export default BrandImageWithFavorite;

import React from 'react';

import clsx from 'clsx';
import { Image, View } from 'react-native';
import Config from 'react-native-config';

import { useFavoriteStore } from '@/shared/store';
import { mapIconShadow } from '@/styles/shadows';

interface Props {
  imageSource: string;
  brandId: string;
  isSelected?: boolean;
}

const StoreMarker = ({ imageSource, brandId, isSelected = false }: Props) => {
  const IMAGE_SIZE = isSelected ? 48 : 28;
  const isFavorite = useFavoriteStore(
    state => state.optimisticFavorites[brandId] ?? false,
  );

  return (
    <View
      style={[mapIconShadow, { width: IMAGE_SIZE, height: IMAGE_SIZE }]}
      className="items-center justify-center">
      <Image
        width={IMAGE_SIZE}
        height={IMAGE_SIZE}
        className={clsx(
          'rounded-full',
          isSelected &&
            `border-2 ${isFavorite ? 'border-primary-pink' : 'border-white'}`,
        )}
        source={{ uri: Config.IMAGE_URL + imageSource }}
        resizeMode="cover"
      />
    </View>
  );
};

export default StoreMarker;

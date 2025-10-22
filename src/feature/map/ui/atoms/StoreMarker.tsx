import React, { memo } from 'react';

import clsx from 'clsx';
import { Image } from 'react-native';
import Config from 'react-native-config';

interface Props {
  imageSource: string;
  isSelected?: boolean;
}

const StoreMarker = ({ imageSource, isSelected = false }: Props) => {
  const IMAGE_SIZE = isSelected ? 48 : 28;

  return (
    <Image
      key={`${imageSource}-${isSelected}`}
      width={IMAGE_SIZE}
      height={IMAGE_SIZE}
      className={clsx('rounded-full', isSelected && 'border-2 border-white')}
      source={{ uri: Config.IMAGE_URL + imageSource }}
      resizeMode="cover"
    />
  );
};

export default memo(StoreMarker, (prev, next) => {
  return (
    prev.imageSource === next.imageSource && prev.isSelected === next.isSelected
  );
});

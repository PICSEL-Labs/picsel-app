import React, { memo } from 'react';

import clsx from 'clsx';
import { Image } from 'react-native';

interface Props {
  imageSource: { uri: string };
  isSelected?: boolean;
}

const StoreMarker = ({ imageSource, isSelected = false }: Props) => {
  const IMAGE_SIZE = isSelected ? 48 : 28;

  return (
    <Image
      key={`${imageSource.uri}-${isSelected}`} // uri와 선택 상태를 조합한 key
      width={IMAGE_SIZE}
      height={IMAGE_SIZE}
      className={clsx('rounded-full', isSelected && 'border-2 border-white')}
      source={imageSource}
      resizeMode="cover"
    />
  );
};

export default memo(StoreMarker, (prev, next) => {
  return (
    prev.imageSource.uri === next.imageSource.uri &&
    prev.isSelected === next.isSelected
  );
});

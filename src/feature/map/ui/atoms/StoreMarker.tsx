import React, { useEffect, useState } from 'react';

import clsx from 'clsx';
import { Image } from 'react-native';

interface Props {
  imageSource: { uri: string };
  isSelected?: boolean;
}

const StoreMarker = ({ imageSource, isSelected = false }: Props) => {
  const [renderKey, setRenderKey] = useState(0);

  const IMAGE_SIZE = isSelected ? 48 : 28;

  useEffect(() => {
    setRenderKey(prev => prev + 1);
  }, [isSelected]);

  return (
    <Image
      key={renderKey}
      width={IMAGE_SIZE}
      height={IMAGE_SIZE}
      className={clsx('rounded-full', isSelected && 'border-2 border-white')}
      source={{
        ...imageSource,
        cache: 'force-cache',
      }}
      resizeMode="cover"
    />
  );
};

export default React.memo(StoreMarker, (prev, next) => {
  return (
    prev.imageSource.uri === next.imageSource.uri &&
    prev.isSelected === next.isSelected
  );
});

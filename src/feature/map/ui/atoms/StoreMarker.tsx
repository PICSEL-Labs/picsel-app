import React, { memo } from 'react';

import clsx from 'clsx';
import { Image, View } from 'react-native';
import Config from 'react-native-config';

import { mapIconShadow } from '@/styles/shadows';

interface Props {
  imageSource: string;
  isSelected?: boolean;
}

const StoreMarker = ({ imageSource, isSelected = false }: Props) => {
  const IMAGE_IMAGE = isSelected ? 48 : 28;

  return (
    <View
      style={[mapIconShadow, { width: IMAGE_IMAGE, height: IMAGE_IMAGE }]}
      className="items-center justify-center">
      <Image
        width={IMAGE_IMAGE}
        height={IMAGE_IMAGE}
        className={clsx('rounded-full', isSelected && 'border-2 border-white')}
        source={{ uri: Config.IMAGE_URL + imageSource }}
        resizeMode="cover"
      />
    </View>
  );
};

export default memo(StoreMarker, (prev, next) => {
  return (
    prev.imageSource === next.imageSource && prev.isSelected === next.isSelected
  );
});

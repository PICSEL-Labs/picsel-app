import React from 'react';

import { View } from 'react-native';

import PhotoSkeleton from './PhotoSkeleton';

interface Props {
  imageWidth: number;
  imageHeight: number;
  columns?: number;
  itemSpacing?: number;
  count?: number;
  horizontalPadding?: number;
}

const GridPhotoSkeleton = ({
  imageWidth,
  imageHeight,
  columns = 2,
  itemSpacing = 8,
  count = 6,
  horizontalPadding = 24,
}: Props) => {
  return (
    <View
      className="flex-row flex-wrap pt-3"
      style={{ paddingHorizontal: horizontalPadding }}>
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={`skeleton-${index}`}
          style={{
            width: imageWidth,
            marginRight: index % columns === columns - 1 ? 0 : itemSpacing,
          }}>
          <PhotoSkeleton imageWidth={imageWidth} imageHeight={imageHeight} />
        </View>
      ))}
    </View>
  );
};

export default GridPhotoSkeleton;

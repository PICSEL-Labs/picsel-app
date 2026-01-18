import React from 'react';

import { ScrollView, View } from 'react-native';

import PhotoSkeleton from './PhotoSkeleton';

interface HorizontalPhotoSkeletonProps {
  imageWidth: number;
  imageHeight: number;
  count?: number;
}

const HorizontalPhotoSkeleton = ({
  imageWidth,
  imageHeight,
  count = 4,
}: HorizontalPhotoSkeletonProps) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex-row">
        {Array.from({ length: count }).map((__, photoIndex) => (
          <View
            key={`skeleton-photo-${photoIndex}`}
            className="mr-3"
            style={{ width: imageWidth }}>
            <PhotoSkeleton imageWidth={imageWidth} imageHeight={imageHeight} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default HorizontalPhotoSkeleton;

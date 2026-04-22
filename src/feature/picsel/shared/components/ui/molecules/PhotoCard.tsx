import React from 'react';

import { Pressable, Text, View } from 'react-native';

import { formatDate } from '../../../../myPicsel/utils/dateUtils';

import CachedImage from '@/shared/components/CachedImage';
import SparkleImages from '@/shared/images/Sparkle';

interface PhotoCardProps {
  photo: {
    id: string;
    uri: string;
    date: string;
    storeName: string;
  };
  imageWidth: number;
  imageHeight: number;
  showYear?: boolean;
  showDate?: boolean;
  showStoreName?: boolean;
  onPress?: () => void;
  onImageLoad?: (uri: string) => void;
  onImageError?: (uri: string) => void;
}

const PhotoCard = ({
  photo,
  imageWidth,
  imageHeight,
  showYear = false,
  showDate = true,
  showStoreName = true,
  onPress,
  onImageLoad,
  onImageError,
}: PhotoCardProps) => {
  return (
    <View style={{ width: imageWidth }}>
      {/* 날짜 */}
      {showDate && (
        <Text className="mb-1 text-gray-900 headline-01">
          {formatDate(photo.date, { showYear })}
        </Text>
      )}

      {/* 사진 */}
      <Pressable className="relative" onPress={onPress}>
        <View
          className="overflow-hidden"
          style={{ width: imageWidth, height: imageHeight }}>
          <CachedImage
            uri={photo.uri}
            style={{ width: imageWidth, height: imageHeight }}
            resizeMode="cover"
            onLoad={() => onImageLoad?.(photo.uri)}
            onError={() => onImageError?.(photo.uri)}
          />
        </View>

        {/* 매장명 */}
        {showStoreName && (
          <View className="mt-1 flex-row items-center">
            <SparkleImages shape="icon-one" height={24} width={24} />
            <Text className="ml-1 text-gray-900 body-rg-03" numberOfLines={1}>
              {photo.storeName}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default PhotoCard;

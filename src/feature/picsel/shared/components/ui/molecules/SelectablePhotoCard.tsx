import React from 'react';

import { Pressable, Text, View } from 'react-native';

import { formatDate } from '../../../../myPicsel/utils/dateUtils';

import SelectionCheckbox from '@/feature/picsel/myPicsel/components/ui/atoms/SelectionCheckbox';
import CachedImage from '@/shared/components/CachedImage';
import SparkleImages from '@/shared/images/Sparkle';

interface Props {
  photo: {
    id: string;
    uri: string;
    date: string;
    storeName: string;
  };
  imageWidth: number;
  imageHeight: number;
  isSelecting: boolean;
  isSelected: boolean;
  showYear?: boolean;
  onToggleSelection: (photoId: string) => void;
  onPress?: (photoId: string) => void;
  onImageLoad?: (uri: string) => void;
  onImageError?: (uri: string) => void;
}

const SelectablePhotoCard = ({
  photo,
  imageWidth,
  imageHeight,
  isSelecting,
  isSelected,
  showYear = true,
  onToggleSelection,
  onPress,
  onImageLoad,
  onImageError,
}: Props) => {
  const handlePress = () => {
    if (isSelecting) {
      onToggleSelection(photo.id);
    } else {
      onPress?.(photo.id);
    }
  };

  return (
    <View style={{ width: imageWidth }}>
      {/* 날짜 */}
      <Text className="mb-1 text-gray-900 headline-01">
        {formatDate(photo.date, { showYear })}
      </Text>

      <Pressable onPress={handlePress}>
        {isSelecting && <SelectionCheckbox isSelected={isSelected} />}

        <View
          className="items-center justify-center overflow-hidden bg-gray-100"
          style={{ width: imageWidth, height: imageHeight }}>
          <CachedImage
            uri={photo.uri}
            style={{ width: imageWidth, height: imageHeight }}
            resizeMode="contain"
            onLoad={() => onImageLoad?.(photo.uri)}
            onError={() => onImageError?.(photo.uri)}
          />
        </View>
      </Pressable>

      <View
        className="mt-1 flex-row items-center"
        style={{ width: imageWidth }}>
        <SparkleImages shape="icon-one" width={25} height={25} />
        <Text
          className="ml-1 flex-1 text-gray-900 body-rg-03"
          numberOfLines={1}>
          {photo.storeName}
        </Text>
      </View>
    </View>
  );
};

export default SelectablePhotoCard;

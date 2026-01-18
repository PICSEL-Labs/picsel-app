import React from 'react';

import { Image, Pressable, Text, View } from 'react-native';

import { formatDate } from '../../../../myPicsel/utils/dateUtils';

import SelectionCheckbox from '@/feature/picsel/myPicsel/components/ui/atoms/SelectionCheckbox';
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
}

const SelectablePhotoCard = ({
  photo,
  imageWidth,
  imageHeight,
  isSelecting,
  isSelected,
  showYear = true,
  onToggleSelection,
}: Props) => {
  return (
    <View style={{ width: imageWidth }}>
      {/* 날짜 */}
      <Text className="mb-1 text-gray-900 headline-01">
        {formatDate(photo.date, { showYear })}
      </Text>

      {/* 선택 체크박스 */}
      {isSelecting && <SelectionCheckbox isSelected={isSelected} />}

      <Pressable
        onPress={() => isSelecting && onToggleSelection(photo.id)}
        className="relative">
        {/* 사진 */}
        <View
          className="overflow-hidden"
          style={{ width: imageWidth, height: imageHeight }}>
          <Image
            source={{ uri: photo.uri }}
            style={{ width: imageWidth, height: imageHeight }}
            resizeMode="cover"
          />
        </View>

        {/* 매장명 */}
        <View className="mt-1 flex-row items-center">
          <SparkleImages shape="icon-one" width={25} height={25} />
          <Text className="ml-1 text-gray-900 body-rg-03" numberOfLines={1}>
            {photo.storeName}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default SelectablePhotoCard;

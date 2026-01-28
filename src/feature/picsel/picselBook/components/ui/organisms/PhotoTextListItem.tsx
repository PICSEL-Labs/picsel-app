import React from 'react';

import { Image, Pressable, Text, View } from 'react-native';

import {
  CONTENT_MAX_LINES,
  PHOTO_DEFAULT_TITLE,
  PHOTO_PLACEHOLDER_TEXT,
  TITLE_MAX_LINES,
} from '../../../constants/photo';
import { CARD_SHADOW, TEXT_LIST_CARD } from '../../../constants/styles';

import { PicselBookPicselItem } from '@/feature/picsel/picselBook/types';
import { usePhotoFormat } from '@/feature/picsel/shared/utils/usePhotoFormat';
import CheckRoundIcons from '@/shared/icons/CheckRound';
import SparkleImages from '@/shared/images/Sparkle';
import { cn } from '@/shared/lib/cn';

interface Props {
  picsel: PicselBookPicselItem;
  isSelecting: boolean;
  isSelected: boolean;
  onToggleSelection: (photoId: string) => void;
  onPress?: (photoId: string) => void;
}

const PhotoTextListItem = ({
  picsel,
  isSelecting,
  isSelected,
  onToggleSelection,
  onPress,
}: Props) => {
  const { formatDate } = usePhotoFormat();

  const formattedDate = formatDate(picsel.takenDate);
  const isDefaultTitle = picsel.title === PHOTO_DEFAULT_TITLE || !picsel.title;
  const isDefaultContent = !picsel.contentPreview;

  const handlePress = () => {
    if (isSelecting) {
      onToggleSelection(picsel.picselId);
    } else {
      onPress?.(picsel.picselId);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      className="mb-3 flex-row items-center space-x-4 self-stretch rounded-xl border border-gray-100 bg-white px-4 py-3"
      style={{
        width: TEXT_LIST_CARD.WIDTH,
        ...CARD_SHADOW,
      }}>
      {/* 이미지 */}
      <View className="relative flex-shrink-0">
        <Image
          source={{ uri: picsel.representativeImagePath }}
          style={{
            width: TEXT_LIST_CARD.IMAGE_WIDTH,
            height: TEXT_LIST_CARD.IMAGE_HEIGHT,
          }}
          resizeMode="cover"
        />
      </View>

      {/* 텍스트 영역 - content */}
      <View className="h-[160px] flex-1 justify-between">
        {/* date text container */}
        <View className="flex-col items-start self-stretch">
          <View className="flex-row items-center justify-between self-stretch">
            <Text className="text-gray-600 body-rg-02">{formattedDate}</Text>
            {isSelecting && (
              <View style={{ marginBottom: 0, marginRight: 0 }}>
                <CheckRoundIcons
                  shape={isSelected ? 'pink' : 'gray'}
                  width={24}
                  height={24}
                />
              </View>
            )}
          </View>

          <View className="mt-0.5 flex-col items-start self-stretch">
            <Text
              className={cn(
                'mb-0.5',
                isDefaultTitle
                  ? 'text-gray-600 body-rg-04'
                  : 'text-gray-900 headline-03',
              )}
              numberOfLines={TITLE_MAX_LINES}>
              {picsel.title || PHOTO_DEFAULT_TITLE}
            </Text>

            <Text
              className={cn(
                'body-rg-02',
                isDefaultContent ? 'text-gray-500' : 'text-gray-900',
              )}
              numberOfLines={CONTENT_MAX_LINES}>
              {picsel.contentPreview || PHOTO_PLACEHOLDER_TEXT}
            </Text>
          </View>
        </View>

        {/* location */}
        <View className="flex-row items-center justify-end self-stretch">
          <SparkleImages shape="icon-one" width={25} height={25} />
          <Text className="text-primary-pink body-rg-02">
            {picsel.storeName}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default PhotoTextListItem;

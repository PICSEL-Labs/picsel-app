import React from 'react';

import { Image, Pressable, Text, View } from 'react-native';

import type { Photo } from '@/feature/picsel/picselBook/data/mockPicselBookPhotoData';
import CheckRoundIcons from '@/shared/icons/CheckRound';
import SparkleImages from '@/shared/images/Sparkle';
import { cn } from '@/shared/lib/cn';

interface Props {
  photo: Photo;
  isSelecting: boolean;
  isSelected: boolean;
  onToggleSelection: (photoId: string) => void;
  onPress?: (photoId: string) => void;
}

const PhotoTextListItem = ({
  photo,
  isSelecting,
  isSelected,
  onToggleSelection,
  onPress,
}: Props) => {
  const handlePress = () => {
    if (isSelecting) {
      onToggleSelection(photo.id);
    } else {
      onPress?.(photo.id);
    }
  };

  // 날짜 포맷팅 (YYYY.MM.DD)
  const formattedDate = photo.date.replace(/-/g, '.');

  // 타이틀이 기본값인지 확인
  const isDefaultTitle = photo.title === '제목 입력' || !photo.title;

  // 내용이 없는지 확인
  const isDefaultContent = !photo.content;

  // 플레이스홀더 텍스트
  const placeholderText =
    '✏️ 이 날의 추억을 기록해보아요!\n(기억하고 싶은 순간, 감정, 에피소드 등을 자유롭게 남겨보세요)';

  return (
    <Pressable
      onPress={handlePress}
      className="mb-3 flex-row items-center space-x-4 self-stretch rounded-xl border border-gray-100 bg-white px-4 py-3"
      style={{
        width: 360,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 4,
        boxShadow:
          '0 -2px 8px 2px rgba(0, 0, 0, 0.10), 2px 4px 8px 0 rgba(255, 255, 255, 0.25) inset;',
      }}>
      {/* 이미지 */}
      <View className="relative flex-shrink-0">
        <Image
          source={{ uri: photo.uri }}
          className="h-[150px] w-[100px]"
          resizeMode="cover"
        />
      </View>

      {/* 텍스트 영역 - content */}
      <View className="h-[160px] flex-1 justify-between">
        {/* date text container */}
        <View className="flex-col items-start self-stretch">
          <View className="flex-row items-center justify-between self-stretch">
            {/* 날짜 */}
            <Text className="text-gray-600 body-rg-02">{formattedDate}</Text>
            {/* 선택 체크박스 */}
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

          {/* text-content */}
          <View className="mt-0.5 flex-col items-start self-stretch">
            {/* 타이틀 */}
            <Text
              className={cn(
                'mb-0.5 headline-03',
                isDefaultTitle ? 'text-gray-600 body-rg-04' : 'text-gray-900',
              )}
              numberOfLines={1}>
              {photo.title || '제목 입력'}
            </Text>

            {/* 내용 */}
            <Text
              className={cn(
                'body-rg-02',
                isDefaultContent ? 'text-gray-500' : 'text-gray-900',
              )}
              numberOfLines={3}>
              {photo.content || placeholderText}
            </Text>
          </View>
        </View>

        {/* location */}
        <View className="flex-row items-center justify-end self-stretch">
          <SparkleImages shape="icon-one" width={25} height={25} />
          <Text className="text-primary-pink body-rg-02">
            {photo.storeName}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default PhotoTextListItem;

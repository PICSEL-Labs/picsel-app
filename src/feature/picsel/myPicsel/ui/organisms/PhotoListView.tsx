import React, { forwardRef } from 'react';

import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import PhotoSkeleton from '@/feature/picsel/shared/components/ui/atoms/PhotoSkeleton';
import CheckIcons from '@/shared/icons/CheckIcons';
import SparkleImages from '@/shared/images/Sparkle';
import { defaultButtonShadow } from '@/styles/shadows';

export interface Photo {
  id: string;
  uri: string;
  date: string;
  storeName: string;
}

interface Props {
  isSelecting: boolean;
  selectedPhotos: string[];
  onToggleSelection: (photoId: string) => void;
  isLoading: boolean;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  data: Photo[];
  showYear?: boolean;
}

const HORIZONTAL_PADDING = 24; // 좌우 패딩 줄임
const ITEM_SPACING = 8; // 아이템 간 간격 줄임

const PhotoListView = forwardRef<FlatList, Props>(
  (
    {
      isSelecting,
      selectedPhotos,
      onToggleSelection,
      isLoading = false,
      onScroll,
      data,
      showYear = true,
    },
    ref,
  ) => {
    const { width: screenWidth } = useWindowDimensions();

    // 이미지 너비 계산
    const imageWidth =
      (screenWidth - HORIZONTAL_PADDING * 2 - ITEM_SPACING) / 2;
    const imageHeight = imageWidth * 1.5;

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
      const dayOfWeek = dayNames[date.getDay()];

      if (showYear) {
        return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
      }
      return `${month}월 ${day}일 (${dayOfWeek})`;
    };

    const getSelectionNumber = (photoId: string) => {
      const index = selectedPhotos.indexOf(photoId);
      return index >= 0 ? index + 1 : null;
    };

    // 스켈레톤 렌더링
    if (isLoading) {
      return (
        <View
          className="flex-row flex-wrap pt-3"
          style={{ paddingHorizontal: HORIZONTAL_PADDING }}>
          {Array.from({ length: 6 }).map((_, index) => (
            <View
              key={`skeleton-${index}`}
              style={{
                width: imageWidth,
                marginRight: index % 2 === 0 ? ITEM_SPACING : 0,
              }}>
              <PhotoSkeleton
                imageWidth={imageWidth}
                imageHeight={imageHeight}
              />
            </View>
          ))}
        </View>
      );
    }

    const renderPhoto = ({
      item: photo,
      index,
    }: {
      item: Photo;
      index: number;
    }) => {
      const selectionNumber = getSelectionNumber(photo.id);
      const isSelected = selectionNumber !== null;
      const isLeftColumn = index % 2 === 0;

      return (
        <View
          className="mb-8"
          style={{
            width: imageWidth,
            marginRight: isLeftColumn ? ITEM_SPACING : 0,
          }}>
          {/* 날짜 */}
          <Text className="mb-1 text-gray-900 headline-01">
            {formatDate(photo.date)}
          </Text>

          {/* 선택 체크박스 */}
          {isSelecting && (
            <View className="mb-2 mr-2 self-end">
              <View
                style={defaultButtonShadow}
                className={`h-6 w-6 items-center justify-center rounded-full bg-white ${
                  isSelected
                    ? 'border-2 border-primary-pink bg-pink-500'
                    : 'border-2 border-secondary-pink-300'
                }`}>
                {isSelected && (
                  <CheckIcons shape="white" width={13} height={13} />
                )}
              </View>
            </View>
          )}

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

    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        ref={ref}
        data={data}
        renderItem={renderPhoto}
        keyExtractor={item => item.id}
        numColumns={2}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingHorizontal: HORIZONTAL_PADDING,
          paddingBottom: 20,
        }}
      />
    );
  },
);

PhotoListView.displayName = 'PhotoListView';

export default PhotoListView;

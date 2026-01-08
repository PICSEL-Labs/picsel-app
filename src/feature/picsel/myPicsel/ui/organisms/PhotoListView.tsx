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

interface Photo {
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
}

// TODO: 실제 데이터로 교체
export const MOCK_PHOTOS: Photo[] = [
  {
    id: '1',
    uri: 'https://picsum.photos/200/300',
    date: '2024-01-27',
    storeName: '하루필름 사진관',
  },
  {
    id: '2',
    uri: 'https://picsum.photos/201/301',
    date: '2024-01-26',
    storeName: '인생네컷 홍대점',
  },
  {
    id: '3',
    uri: 'https://picsum.photos/202/302',
    date: '2024-01-25',
    storeName: '포토이즘 박스 강남점',
  },
  {
    id: '4',
    uri: 'https://picsum.photos/203/303',
    date: '2024-01-24',
    storeName: '셀픽스 신촌점',
  },
  {
    id: '5',
    uri: 'https://picsum.photos/204/304',
    date: '2024-01-23',
    storeName: '포토그레이 명동점',
  },
  {
    id: '6',
    uri: 'https://picsum.photos/205/305',
    date: '2024-01-22',
    storeName: '모노맨션 이태원점',
  },
  {
    id: '7',
    uri: 'https://picsum.photos/206/306',
    date: '2024-01-21',
    storeName: '하루필름 사진관',
  },
  {
    id: '8',
    uri: 'https://picsum.photos/207/307',
    date: '2024-01-20',
    storeName: '인생네컷 건대점',
  },
  {
    id: '9',
    uri: 'https://picsum.photos/208/308',
    date: '2024-01-19',
    storeName: '포토매틱 성수점',
  },
  {
    id: '10',
    uri: 'https://picsum.photos/209/309',
    date: '2024-01-18',
    storeName: '플리즈 사진관',
  },
  {
    id: '11',
    uri: 'https://picsum.photos/210/310',
    date: '2024-01-17',
    storeName: '셀픽스 잠실점',
  },
  {
    id: '12',
    uri: 'https://picsum.photos/211/311',
    date: '2024-01-16',
    storeName: '포토이즘 박스 종로점',
  },
  {
    id: '13',
    uri: 'https://picsum.photos/212/312',
    date: '2024-01-15',
    storeName: '인생네컷 신림점',
  },
  {
    id: '14',
    uri: 'https://picsum.photos/213/313',
    date: '2024-01-14',
    storeName: '하루필름 사진관',
  },
  {
    id: '15',
    uri: 'https://picsum.photos/214/314',
    date: '2024-01-13',
    storeName: '모노맨션 연남점',
  },
  {
    id: '16',
    uri: 'https://picsum.photos/215/315',
    date: '2024-01-12',
    storeName: '포토그레이 홍대점',
  },
  {
    id: '17',
    uri: 'https://picsum.photos/216/316',
    date: '2024-01-11',
    storeName: '셀픽스 합정점',
  },
  {
    id: '18',
    uri: 'https://picsum.photos/217/317',
    date: '2024-01-10',
    storeName: '인생네컷 강남점',
  },
  {
    id: '19',
    uri: 'https://picsum.photos/218/318',
    date: '2024-01-09',
    storeName: '포토매틱 압구정점',
  },
];

const HORIZONTAL_PADDING = 24;
const ITEM_SPACING = 8;

const PhotoListView = forwardRef<FlatList, Props>(
  (
    {
      isSelecting,
      selectedPhotos,
      onToggleSelection,
      isLoading = false,
      onScroll,
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
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
      const dayOfWeek = dayNames[date.getDay()];

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
              <SparkleImages shape="icon-one" height={24} width={24} />
              <Text className="text-gray-900 body-rg-03" numberOfLines={1}>
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
        data={MOCK_PHOTOS}
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

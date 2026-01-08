import React from 'react';

import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import { YearGroup } from './MOCK_YEAR_DATA';

import PhotoSkeleton from '@/feature/picsel/shared/components/ui/atoms/PhotoSkeleton';
import ArrowIcons from '@/shared/icons/ArrowIcons';
import SparkleImages from '@/shared/images/Sparkle';

interface Props {
  yearGroups: YearGroup[];
  isLoading: boolean;
  onViewMore: (month: string) => void;
  onViewAllYear: (year: string) => void;
  scrollViewRef: React.RefObject<ScrollView>;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const HORIZONTAL_PADDING = 24;
const ITEM_SPACING = 8;

const MonthPhotoListView = ({
  yearGroups,
  isLoading,
  onViewMore,
  onViewAllYear,
  scrollViewRef,
  onScroll,
}: Props) => {
  const { width: screenWidth } = useWindowDimensions();

  const imageWidth = (screenWidth - HORIZONTAL_PADDING * 2 - ITEM_SPACING) / 2;
  const imageHeight = imageWidth * 1.5;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = dayNames[date.getDay()];

    return `${month}월 ${day}일 (${dayOfWeek})`;
  };

  if (isLoading) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: HORIZONTAL_PADDING,
          paddingBottom: 20,
          paddingTop: 12,
        }}>
        {Array.from({ length: 2 }).map((__, yearIndex) => (
          <View key={`skeleton-year-${yearIndex}`}>
            {/* Year Header Skeleton */}
            <View className="mb-4 mt-2 flex-row items-center justify-between">
              <View className="h-7 w-20 rounded bg-gray-200" />
              <View className="h-5 w-16 rounded bg-gray-200" />
            </View>

            {/* Month Sections Skeleton */}
            {Array.from({ length: 3 }).map((__, monthIndex) => (
              <View key={`skeleton-month-${monthIndex}`} className="mb-6">
                {/* Month Header Skeleton */}
                <View className="mb-3 flex-row items-center justify-between">
                  <View className="h-6 w-12 rounded bg-gray-200" />
                  <View className="h-5 w-5 rounded bg-gray-200" />
                </View>

                {/* Horizontal Photos Skeleton */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View className="flex-row">
                    {Array.from({ length: 4 }).map((__, photoIndex) => (
                      <View
                        key={`skeleton-photo-${photoIndex}`}
                        className="mr-3"
                        style={{ width: imageWidth }}>
                        <View className="mb-1 h-5 w-32 rounded bg-gray-200" />
                        <PhotoSkeleton
                          imageWidth={imageWidth}
                          imageHeight={imageHeight}
                        />
                        <View className="mt-1 h-4 w-24 rounded bg-gray-200" />
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    );
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
      scrollEventThrottle={16}
      contentContainerStyle={{
        paddingHorizontal: HORIZONTAL_PADDING,
        paddingBottom: 20,
        paddingTop: 12,
      }}>
      {yearGroups.map((yearGroup, yearIndex) => (
        <View key={`${yearGroup.year}-${yearIndex}`}>
          {/* Year Header with 전체보기 */}
          <View className="mb-4 mt-2 flex-row items-center justify-between">
            <Text className="text-gray-900 headline-02">
              {yearGroup.year}년
            </Text>
            <Pressable
              onPress={() => onViewAllYear(yearGroup.year)}
              className="flex-row items-center">
              <Text className="mr-1 text-primary-pink body-rg-01">
                전체보기
              </Text>
            </Pressable>
          </View>

          {/* Month Groups */}
          {yearGroup.months.map((monthGroup, monthIndex) => (
            <View key={`${monthGroup.month}-${monthIndex}`} className="mb-6">
              {/* Month Header with Arrow */}
              <View className="mb-3 flex-row items-center justify-between">
                <Text className="text-gray-900 headline-02">
                  {monthGroup.month}
                </Text>
                <Pressable
                  onPress={() => onViewMore(monthGroup.month)}
                  className="flex-row items-center">
                  <ArrowIcons shape="next" width={20} height={20} />
                </Pressable>
              </View>

              {/* Horizontal Scroll List */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row">
                  {monthGroup.photos.map(photo => (
                    <View
                      key={photo.id}
                      className="mr-3"
                      style={{
                        width: imageWidth,
                      }}>
                      {/* 날짜 */}
                      <Text className="mb-1 text-gray-900 headline-01">
                        {formatDate(photo.date)}
                      </Text>

                      {/* 사진 */}
                      <Pressable className="relative">
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
                          <SparkleImages
                            shape="icon-one"
                            height={24}
                            width={24}
                          />
                          <Text
                            className="ml-1 text-gray-900 body-rg-03"
                            numberOfLines={1}>
                            {photo.storeName}
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default MonthPhotoListView;

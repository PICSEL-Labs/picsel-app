import React from 'react';

import { ScrollView, View, useWindowDimensions } from 'react-native';

import HorizontalPhotoSkeleton from '../atoms/HorizontalPhotoSkeleton';

interface FilterViewSkeletonProps {
  type: 'year' | 'month';
  yearCount?: number;
  monthCount?: number;
  photoCount?: number;
}

const HORIZONTAL_PADDING = 24;
const ITEM_SPACING = 8;

const FilterViewSkeleton = ({
  type,
  yearCount = 2,
  monthCount = 3,
  photoCount = 4,
}: FilterViewSkeletonProps) => {
  const { width: screenWidth } = useWindowDimensions();
  const imageWidth = (screenWidth - HORIZONTAL_PADDING * 2 - ITEM_SPACING) / 2;
  const imageHeight = imageWidth * 1.5;

  if (type === 'year') {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: HORIZONTAL_PADDING,
          paddingBottom: 20,
          paddingTop: 12,
        }}>
        {Array.from({ length: yearCount }).map((__, yearIndex) => (
          <View key={`skeleton-year-${yearIndex}`}>
            {/* Year Header Skeleton with 전체보기 */}
            <View className="mb-4 mt-2 flex-row items-center justify-between">
              <View className="h-7 w-20 rounded bg-gray-200" />
              <View className="h-5 w-16 rounded bg-gray-200" />
            </View>

            {/* Month Sections Skeleton */}
            {Array.from({ length: monthCount }).map((__, monthIndex) => (
              <View key={`skeleton-month-${monthIndex}`} className="mb-6">
                {/* Month Header Skeleton */}
                <View className="mb-3 flex-row items-center justify-between">
                  <View className="h-6 w-12 rounded bg-gray-200" />
                  <View className="h-5 w-5 rounded bg-gray-200" />
                </View>

                {/* Horizontal Photos Skeleton */}
                <HorizontalPhotoSkeleton
                  imageWidth={imageWidth}
                  imageHeight={imageHeight}
                  count={photoCount}
                />
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    );
  }

  // Month type
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: HORIZONTAL_PADDING,
        paddingBottom: 20,
        paddingTop: 12,
      }}>
      {Array.from({ length: monthCount }).map((__, monthIndex) => (
        <View key={`skeleton-month-${monthIndex}`} className="mb-6">
          {/* Month Header Skeleton - "2026년 1월" format */}
          <View className="mb-3 flex-row items-center justify-between">
            <View className="h-6 w-32 rounded bg-gray-200" />
            <View className="h-5 w-5 rounded bg-gray-200" />
          </View>

          {/* Horizontal Photos Skeleton */}
          <HorizontalPhotoSkeleton
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            count={photoCount}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default FilterViewSkeleton;

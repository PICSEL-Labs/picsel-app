import React, { RefObject } from 'react';

import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { HORIZONTAL_PADDING, ITEM_SPACING } from '../../../constants/photoGrid';

import { YearGroup } from './MOCK_YEAR_DATA';

import FilterViewSkeleton from '@/feature/picsel/shared/components/ui/molecules/FilterViewSkeleton';
import PhotoCard from '@/feature/picsel/shared/components/ui/molecules/PhotoCard';
import { useImageDimensions } from '@/feature/picsel/shared/hooks/useImageDimensions';
import ArrowIcons from '@/shared/icons/ArrowIcons';

interface Props {
  yearGroups: YearGroup[];
  isLoading: boolean;
  onViewMonthFolder: (year: string, month: string) => void;
  scrollViewRef: RefObject<ScrollView>;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const MonthFilterView = ({
  yearGroups,
  isLoading,
  onViewMonthFolder,
  scrollViewRef,
  onScroll,
}: Props) => {
  const { imageWidth, imageHeight } = useImageDimensions({
    horizontalPadding: HORIZONTAL_PADDING,
    itemSpacing: ITEM_SPACING,
    columns: 2,
    aspectRatio: 1.5,
  });

  if (isLoading) {
    return <FilterViewSkeleton type="month" />;
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
          {/* 월 */}
          {yearGroup.months.map((monthGroup, monthIndex) => (
            <View key={`${monthGroup.month}-${monthIndex}`} className="mb-6">
              {/* 월 타이틀 */}
              <View className="mb-3 flex-row items-center justify-between">
                <Text className="text-gray-900 headline-02">
                  {yearGroup.year}년 {monthGroup.month}
                </Text>
                <Pressable
                  onPress={() =>
                    onViewMonthFolder(yearGroup.year, monthGroup.month)
                  }
                  className="flex-row items-center">
                  <ArrowIcons shape="next" width={20} height={20} />
                </Pressable>
              </View>

              {/* 이미지 스크롤뷰 */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row">
                  {monthGroup.photos.map(photo => (
                    <View key={photo.id} className="mr-3">
                      <PhotoCard
                        photo={photo}
                        imageWidth={imageWidth}
                        imageHeight={imageHeight}
                        showYear={false}
                      />
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

export default MonthFilterView;

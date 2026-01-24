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
import { YearGroup } from '../../../data/MOCK_YEAR_DATA';

import PhotoCard from '@/feature/picsel/shared/components/ui/molecules/PhotoCard';
import FilterViewSkeleton from '@/feature/picsel/shared/components/ui/molecules/Skeleton/FilterViewSkeleton';
import { useImageDimensions } from '@/feature/picsel/shared/hooks/photo/useImageDimensions';
import ArrowIcons from '@/shared/icons/ArrowIcons';

interface Props {
  yearGroups: YearGroup[];
  isLoading: boolean;
  onViewMore: (year: string, month: string) => void;
  onViewAllYear: (year: string) => void;
  scrollViewRef: RefObject<ScrollView>;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const YearFilterView = ({
  yearGroups,
  isLoading,
  onViewMore,
  onViewAllYear,
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
    return <FilterViewSkeleton type="year" />;
  }

  return (
    <ScrollView
      className="flex-1"
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

          {yearGroup.months.map((monthGroup, monthIndex) => (
            <View key={`${monthGroup.month}-${monthIndex}`} className="mb-6">
              <View className="mb-3 flex-row items-center justify-between">
                <Text className="text-gray-900 headline-02">
                  {monthGroup.month}
                </Text>
                <Pressable
                  onPress={() => onViewMore(yearGroup.year, monthGroup.month)}
                  className="flex-row items-center">
                  <ArrowIcons shape="next" width={20} height={20} />
                </Pressable>
              </View>

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

export default YearFilterView;

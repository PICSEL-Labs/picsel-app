import React, { forwardRef, useMemo } from 'react';

import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { HORIZONTAL_PADDING, ITEM_SPACING } from '../../../constants/photoGrid';
import { MonthGroup, YearGroup } from '../../../types';

import PhotoCard from '@/feature/picsel/shared/components/ui/molecules/PhotoCard';
import FilterViewSkeleton from '@/feature/picsel/shared/components/ui/molecules/Skeleton/FilterViewSkeleton';
import { useImageDimensions } from '@/feature/picsel/shared/hooks/photo/useImageDimensions';
import ArrowIcons from '@/shared/icons/ArrowIcons';

interface FlattenedMonthItem {
  year: string;
  monthGroup: MonthGroup;
}

interface Props {
  yearGroups: YearGroup[];
  isLoading: boolean;
  onViewMonthFolder: (year: string, month: string) => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const MonthFilterView = forwardRef<FlatList, Props>(
  ({ yearGroups, isLoading, onViewMonthFolder, onScroll }, ref) => {
    const { imageWidth, imageHeight } = useImageDimensions({
      horizontalPadding: HORIZONTAL_PADDING,
      itemSpacing: ITEM_SPACING,
      columns: 2,
      aspectRatio: 1.5,
    });

    const flattenedData = useMemo(() => {
      const items: FlattenedMonthItem[] = [];
      yearGroups.forEach(yearGroup => {
        yearGroup.months.forEach(monthGroup => {
          items.push({
            year: yearGroup.year,
            monthGroup,
          });
        });
      });
      return items;
    }, [yearGroups]);

    if (isLoading) {
      return <FilterViewSkeleton type="month" />;
    }

    const renderMonthSection = ({ item }: { item: FlattenedMonthItem }) => (
      <View className="mb-6">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-gray-900 headline-02">
            {item.year}년 {item.monthGroup.month}
          </Text>
          <Pressable
            onPress={() => onViewMonthFolder(item.year, item.monthGroup.month)}
            className="flex-row items-center">
            <ArrowIcons shape="next" width={20} height={20} />
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row">
            {item.monthGroup.photos.map(photo => (
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
    );

    return (
      <FlatList
        ref={ref}
        data={flattenedData}
        renderItem={renderMonthSection}
        keyExtractor={(item, index) =>
          `${item.year}-${item.monthGroup.month}-${index}`
        }
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingHorizontal: HORIZONTAL_PADDING,
          paddingBottom: 40,
          paddingTop: 12,
        }}
      />
    );
  },
);

MonthFilterView.displayName = 'MonthFilterView';

export default MonthFilterView;

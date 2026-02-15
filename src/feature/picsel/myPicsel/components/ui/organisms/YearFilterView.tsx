import React, { forwardRef, useMemo } from 'react';

import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { HORIZONTAL_PADDING, ITEM_SPACING } from '../../../constants/photoGrid';
import { MonthGroup, YearGroup } from '../../../types';

import PhotoCard from '@/feature/picsel/shared/components/ui/molecules/PhotoCard';
import FilterViewSkeleton from '@/feature/picsel/shared/components/ui/molecules/Skeleton/FilterViewSkeleton';
import { useImageDimensions } from '@/feature/picsel/shared/hooks/photo/useImageDimensions';
import { useImagePreload } from '@/shared/hooks/useImagePreload';
import ArrowIcons from '@/shared/icons/ArrowIcons';

type FlattenedItem =
  | { type: 'yearHeader'; year: string }
  | { type: 'month'; year: string; monthGroup: MonthGroup };

interface Props {
  yearGroups: YearGroup[];
  isLoading: boolean;
  onViewMore: (year: string, month: string) => void;
  onViewAllYear: (year: string) => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const YearFilterView = forwardRef<FlatList, Props>(
  ({ yearGroups, isLoading, onViewMore, onViewAllYear, onScroll }, ref) => {
    const { imageWidth, imageHeight } = useImageDimensions({
      horizontalPadding: HORIZONTAL_PADDING,
      itemSpacing: ITEM_SPACING,
      columns: 2,
      aspectRatio: 1.5,
    });

    const flattenedData = useMemo(() => {
      const items: FlattenedItem[] = [];
      yearGroups.forEach(yearGroup => {
        items.push({ type: 'yearHeader', year: yearGroup.year });
        yearGroup.months.forEach(monthGroup => {
          items.push({
            type: 'month',
            year: yearGroup.year,
            monthGroup,
          });
        });
      });
      return items;
    }, [yearGroups]);

    // 모든 사진 URI 추출
    const allPhotoUris = useMemo(
      () =>
        flattenedData.flatMap(item =>
          item.type === 'month'
            ? item.monthGroup.photos.map(photo => photo.uri)
            : [],
        ),
      [flattenedData],
    );

    const { isImagesLoaded, handleImageLoad, handleImageError } =
      useImagePreload(allPhotoUris);

    const showSkeleton =
      isLoading || (!isImagesLoaded && flattenedData.length > 0);

    const renderItem = ({ item }: { item: FlattenedItem }) => {
      if (item.type === 'yearHeader') {
        return (
          <View className="mb-4 mt-2 flex-row items-center justify-between">
            <Text className="text-gray-900 headline-02">{item.year}년</Text>
            <Pressable
              onPress={() => onViewAllYear(item.year)}
              className="flex-row items-center">
              <Text className="mr-1 text-primary-pink body-rg-01">
                전체보기
              </Text>
            </Pressable>
          </View>
        );
      }

      return (
        <View className="mb-6">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-gray-900 headline-02">
              {item.monthGroup.month}
            </Text>
            <Pressable
              onPress={() => onViewMore(item.year, item.monthGroup.month)}
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
                    onImageLoad={handleImageLoad}
                    onImageError={handleImageError}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      );
    };

    return (
      <View style={styles.container}>
        {flattenedData.length > 0 && (
          <FlatList
            style={{ opacity: showSkeleton ? 0 : 1 }}
            ref={ref}
            data={flattenedData}
            renderItem={renderItem}
            keyExtractor={(item, index) =>
              item.type === 'yearHeader'
                ? `year-${item.year}-${index}`
                : `month-${item.year}-${item.monthGroup.month}-${index}`
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
        )}
        {showSkeleton && (
          <View style={StyleSheet.absoluteFill}>
            <FilterViewSkeleton type="year" />
          </View>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

YearFilterView.displayName = 'YearFilterView';

export default YearFilterView;

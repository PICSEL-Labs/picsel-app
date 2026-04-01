import React, { forwardRef, useEffect, useMemo } from 'react';

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

interface FlattenedMonthItem {
  year: string;
  monthGroup: MonthGroup;
}

interface Props {
  yearGroups: YearGroup[];
  isLoading: boolean;
  onViewMonthFolder: (year: string, month: string) => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onShowSkeletonChange?: (showSkeleton: boolean) => void;
  onPhotoPress?: (photoId: string) => void;
}

const MonthFilterView = forwardRef<FlatList, Props>(
  (
    {
      yearGroups,
      isLoading,
      onViewMonthFolder,
      onScroll,
      onShowSkeletonChange,
      onPhotoPress,
    },
    ref,
  ) => {
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

    // 모든 사진 URI 추출
    const allPhotoUris = useMemo(
      () =>
        flattenedData.flatMap(item =>
          item.monthGroup.photos.map(photo => photo.uri),
        ),
      [flattenedData],
    );

    const { isImagesLoaded, handleImageLoad, handleImageError } =
      useImagePreload(allPhotoUris);

    const showSkeleton =
      isLoading || (!isImagesLoaded && flattenedData.length > 0);

    useEffect(() => {
      onShowSkeletonChange?.(showSkeleton);
    }, [showSkeleton, onShowSkeletonChange]);

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
                  onImageLoad={handleImageLoad}
                  onImageError={handleImageError}
                  onPress={() => onPhotoPress?.(photo.id)}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );

    return (
      <View style={styles.container}>
        {flattenedData.length > 0 && (
          <FlatList
            style={{ opacity: showSkeleton ? 0 : 1 }}
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
        )}
        {showSkeleton && (
          <View style={StyleSheet.absoluteFill}>
            <FilterViewSkeleton type="month" />
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

MonthFilterView.displayName = 'MonthFilterView';

export default MonthFilterView;

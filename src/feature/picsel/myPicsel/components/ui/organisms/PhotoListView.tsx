import React, { forwardRef, useEffect, useMemo } from 'react';

import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';

import { HORIZONTAL_PADDING, ITEM_SPACING } from '../../../constants/photoGrid';

import GridPhotoSkeleton from '@/feature/picsel/shared/components/ui/atoms/Skeleton/GridPhotoSkeleton';
import SelectablePhotoCard from '@/feature/picsel/shared/components/ui/molecules/SelectablePhotoCard';
import { useImageDimensions } from '@/feature/picsel/shared/hooks/photo/useImageDimensions';
import { useImagePreload } from '@/shared/hooks/useImagePreload';

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
  onPhotoPress?: (photoId: string) => void;
  onEndReached?: () => void;
  onShowSkeletonChange?: (showSkeleton: boolean) => void;
}

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
      onPhotoPress,
      onEndReached,
      onShowSkeletonChange,
    },
    ref,
  ) => {
    const { imageWidth, imageHeight } = useImageDimensions({
      horizontalPadding: HORIZONTAL_PADDING,
      itemSpacing: ITEM_SPACING,
      columns: 2,
      aspectRatio: 1.5,
    });

    const uris = useMemo(() => data.map(p => p.uri), [data]);
    const { isImagesLoaded, handleImageLoad, handleImageError } =
      useImagePreload(uris);

    const showSkeleton = isLoading || (!isImagesLoaded && data.length > 0);

    useEffect(() => {
      onShowSkeletonChange?.(showSkeleton);
    }, [showSkeleton, onShowSkeletonChange]);

    const renderPhoto = ({
      item: photo,
      index,
    }: {
      item: Photo;
      index: number;
    }) => {
      const isSelected = selectedPhotos.includes(photo.id);
      const isLeftColumn = index % 2 === 0;

      return (
        <View
          className="mb-8"
          style={{
            width: imageWidth,
            marginRight: isLeftColumn ? ITEM_SPACING : 0,
          }}>
          <SelectablePhotoCard
            photo={photo}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            isSelecting={isSelecting}
            isSelected={isSelected}
            showYear={showYear}
            onToggleSelection={onToggleSelection}
            onImageLoad={handleImageLoad}
            onImageError={handleImageError}
            onPress={() => !isSelecting && onPhotoPress?.(photo.id)}
          />
        </View>
      );
    };

    return (
      <View className="flex-1">
        {data.length > 0 && (
          <FlatList
            style={{ opacity: showSkeleton ? 0 : 1 }}
            showsVerticalScrollIndicator={false}
            ref={ref}
            data={data}
            renderItem={renderPhoto}
            keyExtractor={item => item.id}
            numColumns={2}
            onScroll={onScroll}
            scrollEventThrottle={16}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            contentContainerStyle={{
              paddingHorizontal: HORIZONTAL_PADDING,
              paddingBottom: 40,
            }}
          />
        )}
        {showSkeleton && (
          <View style={StyleSheet.absoluteFill}>
            <GridPhotoSkeleton
              imageWidth={imageWidth}
              imageHeight={imageHeight}
              columns={2}
              itemSpacing={ITEM_SPACING}
              count={6}
              horizontalPadding={HORIZONTAL_PADDING}
            />
          </View>
        )}
      </View>
    );
  },
);

PhotoListView.displayName = 'PhotoListView';

export default PhotoListView;

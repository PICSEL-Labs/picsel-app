import React, { forwardRef } from 'react';

import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from 'react-native';

import { HORIZONTAL_PADDING, ITEM_SPACING } from '../../constants/photoGrid';

import GridPhotoSkeleton from '@/feature/picsel/shared/components/ui/atoms/GridPhotoSkeleton';
import SelectablePhotoCard from '@/feature/picsel/shared/components/ui/molecules/SelectablePhotoCard';
import { useImageDimensions } from '@/feature/picsel/shared/hooks/useImageDimensions';

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
    const { imageWidth, imageHeight } = useImageDimensions({
      horizontalPadding: HORIZONTAL_PADDING,
      itemSpacing: ITEM_SPACING,
      columns: 2,
      aspectRatio: 1.5,
    });

    // 스켈레톤 렌더링
    if (isLoading) {
      return (
        <GridPhotoSkeleton
          imageWidth={imageWidth}
          imageHeight={imageHeight}
          columns={2}
          itemSpacing={ITEM_SPACING}
          count={6}
          horizontalPadding={HORIZONTAL_PADDING}
        />
      );
    }

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
          />
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

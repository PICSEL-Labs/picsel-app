import React, { forwardRef, useMemo } from 'react';

import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';

import PhotoTextListItem from './PhotoTextListItem';

import { PicselBookPicselItem } from '@/feature/picsel/picselBook/types';
import PhotoTextListSkeleton from '@/feature/picsel/shared/components/ui/atoms/Skeleton/PhotoTextListItemSkeleton';
import { useImagePreload } from '@/shared/hooks/useImagePreload';
import { getImageUrl } from '@/shared/utils/image';

interface Props {
  data: PicselBookPicselItem[];
  selectedPhotos: string[];
  isSelecting: boolean;
  isLoading?: boolean;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onToggleSelection: (photoId: string) => void;
  onPhotoPress?: (photoId: string) => void;
}

const PhotoTextListView = forwardRef<FlatList, Props>(
  (
    {
      data,
      selectedPhotos,
      isSelecting,
      isLoading = false,
      onScroll,
      onToggleSelection,
      onPhotoPress,
    },
    ref,
  ) => {
    const uris = useMemo(
      () => data.map(d => getImageUrl(d.representativeImagePath)),
      [data],
    );
    const { isImagesLoaded, handleImageLoad, handleImageError } =
      useImagePreload(uris);

    const showSkeleton = isLoading || (!isImagesLoaded && data.length > 0);

    const renderItem = ({ item }: { item: PicselBookPicselItem }) => {
      const isSelected = selectedPhotos.includes(item.picselId);

      return (
        <PhotoTextListItem
          picsel={item}
          isSelecting={isSelecting}
          isSelected={isSelected}
          onToggleSelection={onToggleSelection}
          onPress={() => !isSelecting && onPhotoPress?.(item.picselId)}
          onImageLoad={handleImageLoad}
          onImageError={handleImageError}
        />
      );
    };

    return (
      <View style={styles.container}>
        {data.length > 0 && (
          <FlatList
            style={{ opacity: showSkeleton ? 0 : 1 }}
            ref={ref}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.picselId}
            contentContainerStyle={{
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingTop: 8,
              paddingBottom: 30,
            }}
            showsVerticalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
          />
        )}
        {showSkeleton && (
          <View style={StyleSheet.absoluteFill}>
            <PhotoTextListSkeleton count={4} />
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

PhotoTextListView.displayName = 'PhotoTextListView';

export default PhotoTextListView;

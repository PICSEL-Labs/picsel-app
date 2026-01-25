import React, { forwardRef } from 'react';

import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import PhotoTextListItem from './PhotoTextListItem';

import type { Photo } from '@/feature/picsel/picselBook/data/mockPicselBookPhotoData';

interface Props {
  data: Photo[];
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
      onScroll,
      onToggleSelection,
      onPhotoPress,
    },
    ref,
  ) => {
    const renderItem = ({ item }: { item: Photo }) => {
      const isSelected = selectedPhotos.includes(item.id);

      return (
        <PhotoTextListItem
          photo={item}
          isSelecting={isSelecting}
          isSelected={isSelected}
          onToggleSelection={onToggleSelection}
          onPress={onPhotoPress}
        />
      );
    };

    return (
      <FlatList
        ref={ref}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
    );
  },
);

PhotoTextListView.displayName = 'PhotoTextListView';

export default PhotoTextListView;

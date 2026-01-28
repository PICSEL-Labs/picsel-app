import React, { forwardRef } from 'react';

import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import PhotoTextListItem from './PhotoTextListItem';

import { PicselBookPicselItem } from '@/feature/picsel/picselBook/types';

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
      onScroll,
      onToggleSelection,
      onPhotoPress,
    },
    ref,
  ) => {
    const renderItem = ({ item }: { item: PicselBookPicselItem }) => {
      const isSelected = selectedPhotos.includes(item.picselId);

      return (
        <PhotoTextListItem
          picsel={item}
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
    );
  },
);

PhotoTextListView.displayName = 'PhotoTextListView';

export default PhotoTextListView;

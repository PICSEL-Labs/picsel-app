import React, { useMemo } from 'react';

import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';

import { GridPhoto } from '../../hooks/useInfiniteScrollPhotos';

import CameraIcons from '@/shared/icons/CameraIcons ';
import SelectIcons from '@/shared/icons/SelectIcons';

const { width } = Dimensions.get('window');
const IMAGE_SIZE = width / 3;

type GridItem = { type: 'camera' } | { type: 'photo'; photo: GridPhoto };

interface Props {
  photos: GridPhoto[];
  selectedUris: string[];
  variant: 'main' | 'extra' | 'cover';
  onSelectPhoto: (uri: string) => void;
  onOpenCamera: () => void;
  onLoadMore: () => void;
}

export const PhotoGrid = ({
  photos,
  selectedUris,
  variant,
  onSelectPhoto,
  onOpenCamera,
  onLoadMore,
}: Props) => {
  const data: GridItem[] = useMemo(
    () => [
      { type: 'camera' },
      ...photos.map(photo => ({ type: 'photo' as const, photo })),
    ],
    [photos],
  );

  const renderItem = ({ item }: { item: GridItem }) => {
    if (item.type === 'camera') {
      return (
        <Pressable
          onPress={onOpenCamera}
          className="items-center justify-center"
          style={{
            width: IMAGE_SIZE,
            height: IMAGE_SIZE,
            backgroundColor: '#111114',
          }}>
          <CameraIcons shape="XL" width={40} height={40} color="#FFFFFF" />
          <Text className="text-white body-rg-01">사진 촬영</Text>
        </Pressable>
      );
    }

    const uri = item.photo.uri;

    const selectedIndex = selectedUris.indexOf(uri);
    const isSelected = selectedIndex !== -1;

    const renderSelection = () => {
      if (!isSelected) {
        return <SelectIcons shape="default" width={24} height={24} />;
      }

      if (variant === 'main') {
        return <SelectIcons shape="active" width={24} height={24} />;
      }

      return (
        <View className="h-6 w-6 items-center justify-center rounded-full bg-pink-500">
          <Text className="text-white headline-01">{selectedIndex + 1}</Text>
        </View>
      );
    };

    return (
      <Pressable onPress={() => onSelectPhoto(uri)}>
        <View style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}>
          <Image
            source={{ uri }}
            className="h-full w-full rounded-none"
            resizeMode="cover"
          />
          <View className="absolute right-2 top-2">{renderSelection()}</View>
        </View>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={data}
      numColumns={3}
      keyExtractor={item => (item.type === 'camera' ? 'camera' : item.photo.id)}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      onEndReached={onLoadMore}
      onEndReachedThreshold={2.0}
      bounces={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    />
  );
};

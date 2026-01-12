import React from 'react';

import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';

import CameraIcons from '@/shared/icons/CameraIcons ';
import SelectIcons from '@/shared/icons/SelectIcons';

const { width } = Dimensions.get('window');
const IMAGE_SIZE = width / 3;

type GridItem =
  | { type: 'camera' }
  | { type: 'photo'; node: PhotoIdentifier['node'] };

interface Props {
  photos: PhotoIdentifier[];
  // selectedUri: string | null;
  selectedUris: string[];
  onSelectPhoto: (uri: string) => void;
  onOpenCamera: () => void;
  onLoadMore: () => void;
}

export const PhotoGrid = ({
  photos,
  selectedUris,
  onSelectPhoto,
  onOpenCamera,
  onLoadMore,
}: Props) => {
  const data: GridItem[] = [
    { type: 'camera' },
    ...photos.map(photo => ({ type: 'photo' as const, node: photo.node })),
  ];

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

    const uri = item.node.image.uri;
    // const isSelected = selectedUri === uri;

    const isSelected = selectedUris.includes(uri);

    return (
      <Pressable onPress={() => onSelectPhoto(uri)}>
        <View style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}>
          <Image
            source={{ uri }}
            className="h-full w-full rounded-none"
            resizeMode="cover"
          />
          <View className="absolute right-2 top-2">
            <SelectIcons
              shape={isSelected ? 'active' : 'default'}
              width={24}
              height={24}
            />
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={data}
      numColumns={3}
      keyExtractor={(_, idx) => idx.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.6}
      bounces={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    />
  );
};

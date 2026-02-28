import React, { memo } from 'react';

import { Image, Pressable, Text, View } from 'react-native';

import { ITEM_HEIGHT } from '../../constants/album';
import { Album } from '../../hooks/useAlbumList';

interface Props {
  item: Album;
  isSelected: boolean;
  onPress: () => void;
}

const AlbumItem = memo(({ item, isSelected, onPress }: Props) => (
  <Pressable
    onPress={onPress}
    className="flex-row items-center border-b border-gray-100 px-5 py-3"
    style={{ height: ITEM_HEIGHT, gap: 12 }}>
    {item.thumbnailUri ? (
      <Image
        source={{ uri: item.thumbnailUri }}
        className="h-14 w-14 rounded-lg"
        resizeMode="cover"
      />
    ) : (
      <View className="h-14 w-14 items-center justify-center rounded-lg bg-gray-200" />
    )}
    <View className="flex-1">
      <Text
        className={`${isSelected ? 'text-pink-500' : 'text-gray-900'} body-rg-02`}>
        {item.title}
      </Text>
      <Text className="text-gray-500 body-rg-01">
        {item.count.toLocaleString()}
      </Text>
    </View>
  </Pressable>
));

export default AlbumItem;

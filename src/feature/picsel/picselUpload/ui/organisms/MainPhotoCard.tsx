import React from 'react';

import { Image, Pressable, Text, View } from 'react-native';

import AlbumIcons from '@/shared/icons/AlbumIcons';
import CloseCircleIcons from '@/shared/icons/CloseCircleIcons';
import PlusCircleIcons from '@/shared/icons/PlusCircleIcons';

interface Props {
  uri: string | null;
  onDelete: () => void;
  onSelect: () => void;
}

const MainPhotoCard = ({ uri, onDelete, onSelect }: Props) => {
  const hasPhoto = !!uri;

  return (
    <View className="items-center px-4 pb-8 pt-6">
      <View className="relative max-h-[280px] max-w-[280px]">
        <Pressable
          onPress={!hasPhoto ? onSelect : undefined}
          disabled={hasPhoto}
          className={`aspect-square overflow-hidden rounded-xl border bg-white ${
            hasPhoto ? 'border-pink-300' : 'border-pink-500'
          }`}>
          {hasPhoto ? (
            <Image
              source={{ uri }}
              className="h-full w-full"
              resizeMode="contain"
            />
          ) : (
            <View className="flex-1 items-center justify-center gap-1">
              <AlbumIcons shape="pink" width={40} height={40} />
              <Text className="text-pink-500 body-rg-02">사진 선택</Text>
            </View>
          )}
        </Pressable>
        <View
          className={`absolute left-0 top-0 rounded-br-xl rounded-tl-xl border px-3 py-2 ${
            hasPhoto
              ? 'border-pink-300 bg-pink-100'
              : 'border-pink-500 bg-pink-100'
          }`}>
          <Text className="text-pink-500 body-rg-01">대표{'\n'}사진</Text>
        </View>
        {hasPhoto ? (
          <Pressable
            onPress={onDelete}
            hitSlop={10}
            className="absolute -right-2 -top-2">
            <CloseCircleIcons shape="M" width={24} height={24} />
          </Pressable>
        ) : (
          <Pressable
            onPress={onSelect}
            hitSlop={10}
            className="absolute -right-2 -top-2">
            <PlusCircleIcons shape="M" width={24} height={24} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default MainPhotoCard;

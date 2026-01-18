import React from 'react';

import { Image, Pressable, View } from 'react-native';

import CloseCircleIcons from '@/shared/icons/CloseCircleIcons';

interface Props {
  uri: string;
  onDelete: () => void;
}

const ExtraPhotoCard = ({ uri, onDelete }: Props) => {
  return (
    <View className="relative h-[96px] w-[96px]">
      <View className="absolute bottom-0 left-0 h-[88px] w-[88px]">
        <Image
          source={{ uri }}
          className="h-full w-full rounded-xl border border-gray-300"
          resizeMode="contain"
        />
      </View>
      <Pressable
        onPress={onDelete}
        hitSlop={8}
        className="absolute right-0 top-0 z-10">
        <CloseCircleIcons shape="S" width={20} height={20} />
      </Pressable>
    </View>
  );
};

export default ExtraPhotoCard;

import React from 'react';

import { Pressable, Text } from 'react-native';

import CenterIcons from '@/shared/icons/CenterIcons';

interface Props {
  count: number;
  onPress: () => void;
}

const AddPhotoItem = ({ count, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className="h-[88px] w-[88px] items-center justify-center rounded-xl border border-pink-500 bg-white">
      <CenterIcons shape="pink" width={30} height={30} />
      <Text className="mt-1 text-pink-500 headline-01">{count}/10</Text>
    </Pressable>
  );
};

export default AddPhotoItem;

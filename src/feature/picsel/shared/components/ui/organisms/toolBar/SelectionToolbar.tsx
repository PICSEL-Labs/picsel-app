import React from 'react';

import { Pressable, Text, View } from 'react-native';

import CheckRoundIcons from '@/shared/icons/CheckRound';
import CloseIcons from '@/shared/icons/CloseIcons';

interface Props {
  totalPhotos: number;
  selectedCount: number;
  onSelectAll: () => void;
  onClose: () => void;
}

const SelectionToolbar = ({
  totalPhotos,
  selectedCount,
  onSelectAll,
  onClose,
}: Props) => {
  const isAllSelected = selectedCount === totalPhotos && totalPhotos > 0;

  return (
    <View className="flex-row items-center justify-between bg-white/90 px-6 py-4">
      <Pressable
        onPress={onSelectAll}
        className="flex-row items-center space-x-0.5">
        <CheckRoundIcons
          shape={isAllSelected ? 'check-round' : 'default'}
          width={24}
          height={24}
        />
        <Text
          className={`${isAllSelected ? 'text-primary-black' : 'text-gray-600'} body-rg-02`}>
          전체 선택
        </Text>
      </Pressable>

      <Pressable onPress={onClose}>
        <CloseIcons shape="black" width={24} height={24} />
      </Pressable>
    </View>
  );
};

export default SelectionToolbar;

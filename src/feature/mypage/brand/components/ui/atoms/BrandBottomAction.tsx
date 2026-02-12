import React from 'react';

import { Pressable, Text, View } from 'react-native';

import {
  BrandSettingMode,
  ACTION_TEXTS,
} from '../../../constants/brandSettingTexts';

import PicselActionIcons from '@/shared/icons/PicselActionIcons';

interface Props {
  mode: BrandSettingMode;
  removeCount: number;
  addCount: number;
  hasFavorites: boolean;
  onConfirmRemove: () => void;
  onConfirmAdd: () => void;
}

const BrandBottomAction = ({
  mode,
  removeCount,
  addCount,
  hasFavorites,
  onConfirmRemove,
  onConfirmAdd,
}: Props) => {
  if (mode === 'remove' && hasFavorites) {
    return (
      <View className="flex-row">
        <Pressable
          className="ml-2 mt-1 flex-1 flex-row items-center justify-center space-x-1 rounded-lg py-3"
          onPress={onConfirmRemove}>
          <PicselActionIcons shape="delete" width={24} height={24} />
          <Text className="text-semantic-error headline-02">
            {ACTION_TEXTS.REMOVE(removeCount)}
          </Text>
        </Pressable>
      </View>
    );
  }

  if (mode === 'add') {
    return (
      <View className="flex-row">
        <Pressable
          className="ml-2 mt-1 flex-1 flex-row items-center justify-center space-x-1 rounded-lg py-3"
          onPress={onConfirmAdd}>
          <Text className="text-primary-pink headline-02">
            {ACTION_TEXTS.ADD(addCount)}
          </Text>
        </Pressable>
      </View>
    );
  }

  return null;
};

export default BrandBottomAction;

import React from 'react';

import { Pressable, View } from 'react-native';

import Kebab from '@/assets/icons/kebab/icon-kebab.svg';
import ArrowIcons from '@/shared/icons/ArrowIcons';

interface Props {
  onBackPress?: () => void;
  rightIconPress?: () => void;
}
const PicselDetailHeader = ({ onBackPress, rightIconPress }: Props) => {
  return (
    <View className="flex w-full flex-row items-center justify-between px-4 py-3">
      <Pressable onPress={onBackPress} hitSlop={10}>
        <ArrowIcons shape="back" width={24} height={24} />
      </Pressable>

      <Pressable onPress={rightIconPress}>
        <Kebab />
      </Pressable>
    </View>
  );
};

export default PicselDetailHeader;

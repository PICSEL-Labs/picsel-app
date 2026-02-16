import React from 'react';

import { Pressable, View } from 'react-native';

import Kebab from '@/assets/icons/kebab/icon-kebab.svg';
import ArrowIcons from '@/shared/icons/ArrowIcons';

interface Props {
  onBack?: () => void;
}
const PicselDetailHeader = ({ onBack }: Props) => {
  return (
    <View className="flex w-full flex-row items-center justify-between px-4">
      <Pressable onPress={onBack}>
        <ArrowIcons shape="back" width={24} height={24} />
      </Pressable>

      <Pressable onPress={() => console.log('더보기 클릭')}>
        <Kebab />
      </Pressable>
    </View>
  );
};

export default PicselDetailHeader;

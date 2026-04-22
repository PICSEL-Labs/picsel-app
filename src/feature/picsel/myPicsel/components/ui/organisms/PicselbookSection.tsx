import React from 'react';

import { Pressable, Text, View } from 'react-native';

import { PicselDetailBook } from '../../../types';

import ArrowIcons from '@/shared/icons/ArrowIcons';
import PicselBookIcons from '@/shared/icons/PicselBookIcons';
import { getImageUrl } from '@/shared/utils/image';

interface Props {
  picselbook: PicselDetailBook | undefined;
  onMovePress: () => void;
}

const PicselbookSection = ({ picselbook, onMovePress }: Props) => {
  return (
    <View className="gap-3 px-5 pb-12">
      <View className="flex-row items-center justify-between">
        <Text className="text-gray-900 headline-02">픽셀북</Text>
        <Pressable className="flex-row items-center p-2" onPress={onMovePress}>
          <Text className="text-pink-500 headline-02">
            다른 픽셀북으로 이동
          </Text>
          <ArrowIcons shape="next-pink" width={24} height={24} />
        </Pressable>
      </View>

      <View className="items-center gap-2" style={{ width: 80 }}>
        <PicselBookIcons
          shape={picselbook?.coverImagePath ? 'cover-selected' : 'default'}
          width={80}
          height={72}
          imageUri={
            picselbook?.coverImagePath
              ? getImageUrl(picselbook.coverImagePath)
              : undefined
          }
          opacity={1}
        />
        <Text
          className="text-center text-gray-900 body-rg-02"
          numberOfLines={1}
          ellipsizeMode="tail">
          {picselbook?.bookName}
        </Text>
      </View>
    </View>
  );
};

export default PicselbookSection;

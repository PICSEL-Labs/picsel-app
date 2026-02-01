import React from 'react';

import { Pressable, Text, View } from 'react-native';

import MypageIcons from '@/shared/icons/MypageIcons';

interface Props {
  nickname: string;
  onPressEdit: () => void;
}

const NicknameSection = ({ nickname, onPressEdit }: Props) => {
  return (
    <View
      className="flex w-full flex-row items-center px-5 py-2"
      style={{ gap: 8 }}>
      <Text className="text-gray-900 title-05">{nickname}</Text>

      <Pressable onPress={onPressEdit}>
        <MypageIcons shape="edit-name" width={24} height={24} />
      </Pressable>
    </View>
  );
};

export default NicknameSection;

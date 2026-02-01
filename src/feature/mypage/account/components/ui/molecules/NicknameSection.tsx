import React from 'react';

import { Pressable, Text, View } from 'react-native';

import MypageIcons from '@/shared/icons/MypageIcons';

interface Props {
  nickname: string;
  onEdit: () => void;
}

const NicknameSection = ({ nickname, onEdit }: Props) => {
  return (
    <View className="flex flex-col items-start self-stretch px-4 pt-2">
      <Text className="pb-2 text-gray-900 headline-02">닉네임</Text>
      <View className="flex flex-row items-center justify-between self-stretch rounded-xl bg-gray-50 py-4 pl-5 pr-4">
        <Text className="text-gray-900 title-01">{nickname}</Text>

        <Pressable
          className="flex-row items-center"
          style={{ gap: 2 }}
          onPress={onEdit}>
          <MypageIcons shape="edit-name" width={24} height={24} />
          <Text className="text-primary-pink body-rg-02">수정하기</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default NicknameSection;

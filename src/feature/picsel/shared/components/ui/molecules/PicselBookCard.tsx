import React from 'react';

import { Pressable, Text, View } from 'react-native';

import PicselBookIcons from '@/shared/icons/PicselBookIcons';

interface Props {
  id: string;
  title: string;
  coverImage?: string;
  onPress?: (id: string) => void;
}

const PicselBookCard = ({ id, title, coverImage, onPress }: Props) => {
  const handlePress = () => {
    onPress?.(id);
  };

  return (
    <Pressable
      onPress={handlePress}
      className="flex flex-col items-center"
      style={{ width: 80 }}>
      {/* 픽셀북 아이콘 */}
      <View className="mb-2">
        <PicselBookIcons
          shape={coverImage ? 'cover-selected' : 'default'}
          width={80}
          height={72}
        />
      </View>

      {/* 제목 - 말줄임표 처리 */}
      <Text
        className="mb-1 text-center text-gray-900 body-rg-02"
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{ width: 80 }}>
        {title}
      </Text>
    </Pressable>
  );
};

export default PicselBookCard;

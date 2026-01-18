import React from 'react';

import { Pressable, Text, View } from 'react-native';

import CheckRoundIcons from '@/shared/icons/CheckRound';
import PicselBookIcons from '@/shared/icons/PicselBookIcons';

interface Props {
  id: string;
  title: string;
  coverImage?: string;
  isSelecting?: boolean;
  isSelected?: boolean;
  onPress?: (id: string) => void;
}

const PicselBookCard = ({
  id,
  title,
  coverImage,
  isSelecting = false,
  isSelected = false,
  onPress,
}: Props) => {
  const handlePress = () => {
    onPress?.(id);
  };

  return (
    <Pressable
      onPress={handlePress}
      className="flex flex-col items-center"
      style={{ width: 80 }}>
      {/* 픽셀북 아이콘 */}
      <View className="relative mb-2">
        <PicselBookIcons
          shape="default"
          width={80}
          height={72}
          imageUri={coverImage ? coverImage : undefined}
        />
        {/* 선택 모드 체크박스 */}
        {isSelecting && (
          <View className="absolute right-[25px] top-[25px]">
            <CheckRoundIcons
              shape={isSelected ? 'pink' : 'white'}
              width={24}
              height={24}
            />
          </View>
        )}
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

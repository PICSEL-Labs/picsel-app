import React from 'react';

import { Pressable, Text, View } from 'react-native';

import PicselBookIcons from '@/shared/icons/PicselBookIcons';

interface Props {
  onPress: () => void;
}

const AddBookButton = ({ onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex flex-col items-center"
      style={{ width: 80 }}>
      <View className="mb-2">
        <PicselBookIcons shape="add" width={80} height={72} />
      </View>

      <Text className="text-center text-primary-pink headline-01">
        추가하기
      </Text>
    </Pressable>
  );
};

export default AddBookButton;

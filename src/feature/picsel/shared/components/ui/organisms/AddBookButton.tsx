import React from 'react';

import { Pressable, Text } from 'react-native';

import PicselBookIcons from '@/shared/icons/PicselBookIcons';

interface Props {
  onPress: () => void;
}

const AddBookButton = ({ onPress }: Props) => {
  return (
    <Pressable
      className="absolute left-9 top-14 flex-col space-y-2"
      onPress={onPress}>
      <PicselBookIcons shape="add" width={80} height={72} />
      <Text className="text-center text-primary-pink headline-01">
        추가하기
      </Text>
    </Pressable>
  );
};

export default AddBookButton;

import React from 'react';

import { Pressable, View } from 'react-native';

import FloatingButton from '@/shared/icons/FloatingButton';

interface Props {
  onPress: () => void;
}

const UpButton = ({ onPress }: Props) => {
  return (
    <View className="absolute left-[5px]">
      <Pressable onPress={onPress}>
        <FloatingButton shape="floating" />
      </Pressable>
    </View>
  );
};

export default UpButton;

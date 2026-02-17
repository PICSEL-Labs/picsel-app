import React from 'react';

import { Pressable } from 'react-native';

import FloatingButton from '@/shared/icons/FloatingButton';

interface Props {
  onPress: () => void;
}

const UpButton = ({ onPress }: Props) => {
  return (
    <Pressable onPress={onPress}>
      <FloatingButton shape="floating" />
    </Pressable>
  );
};

export default UpButton;

import React from 'react';

import { Pressable } from 'react-native';

import ArrowUpIcon from '@/assets/button/floating.svg';

interface Props {
  onPress: () => void;
}

const UpButton = ({ onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className="h-12 w-12 items-center justify-center">
      <ArrowUpIcon width={40} height={40} />
    </Pressable>
  );
};

export default UpButton;

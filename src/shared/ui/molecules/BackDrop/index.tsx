import React from 'react';

import { TouchableWithoutFeedback, View } from 'react-native';

interface Props {
  onClose: () => void;
}

const BackDrop = ({ onClose }: Props) => {
  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View className="flex-1 bg-[#11111480]" />
    </TouchableWithoutFeedback>
  );
};

export default BackDrop;

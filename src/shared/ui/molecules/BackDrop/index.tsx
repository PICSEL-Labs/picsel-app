import React from 'react';

import { TouchableWithoutFeedback, View } from 'react-native';

const BackDrop = () => {
  return (
    <TouchableWithoutFeedback>
      <View className="flex-1 bg-[#11111480]" />
    </TouchableWithoutFeedback>
  );
};

export default BackDrop;

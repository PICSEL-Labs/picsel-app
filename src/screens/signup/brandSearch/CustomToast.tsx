import React from 'react';

import { Text, View } from 'react-native';
// 와이어프레임 임시

interface Props {
  text1?: string;
}

export const CustomSuccessToast = ({ text1 }: Props) => {
  return (
    <View className="mx-4 mb-4 rounded-xl bg-black px-4 py-2">
      <Text className="text-sm text-white">{text1}</Text>
    </View>
  );
};

import React from 'react';

import { View } from 'react-native';

interface Props {
  currentStep: number;
  totalStep: number;
}

const ProgressBar = ({ currentStep, totalStep }: Props) => {
  const percent = (currentStep / totalStep) * 100;

  return (
    <View className="h-1 w-full bg-gray-50">
      <View className="h-full bg-pink-500" style={{ width: `${percent}%` }} />
    </View>
  );
};
export default ProgressBar;

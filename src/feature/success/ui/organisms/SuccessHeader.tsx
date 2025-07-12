import React from 'react';

import { View, Text } from 'react-native';

import Gradient from '@/assets/gradient/gradient.svg';
import SparkleIcons from '@/shared/icons/SparkleIcons';

const SuccessHeader = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="flex-[0.05]" />
      <Gradient className="absolute top-[20%]" />
      <Text className="text-center text-[#FFFFFF] title-05">
        픽셀러가 된걸 환영해요!{'\n'}세상의 모든 포토부스{'\n'}즐기러 가볼까요?
      </Text>

      <SparkleIcons shape="big" width={340} height={418} />
    </View>
  );
};

export default SuccessHeader;

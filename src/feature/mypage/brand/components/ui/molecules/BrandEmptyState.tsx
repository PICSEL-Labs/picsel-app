import React from 'react';

import { Text, View } from 'react-native';

import { EMPTY_TEXT } from '../../../constants/brandSettingTexts';

import SparkleImages from '@/shared/images/Sparkle';

const BrandEmptyState = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <SparkleImages shape="bg-opacity" height={418} width={340} />
      <Text className="absolute text-gray-900 headline-04">{EMPTY_TEXT}</Text>
    </View>
  );
};

export default BrandEmptyState;

import React from 'react';

import { Text, View } from 'react-native';

import {
  BrandSettingMode,
  GUIDE_TEXTS,
} from '../../../constants/brandSettingTexts';

interface Props {
  mode: BrandSettingMode;
  hasFavorites: boolean;
}

const BrandGuideText = ({ mode, hasFavorites }: Props) => {
  if (mode === 'default') {
    return null;
  }
  if (mode === 'remove' && !hasFavorites) {
    return null;
  }

  const { highlight, rest } = GUIDE_TEXTS[mode];

  return (
    <View
      className={`flex items-center justify-center px-1 py-2 ${mode === 'remove' ? '-mb-3' : ''}`}>
      <Text className="text-gray-500 headline-01">
        <Text className="text-primary-pink headline-01">{highlight}</Text>
        {rest}
      </Text>
    </View>
  );
};

export default BrandGuideText;

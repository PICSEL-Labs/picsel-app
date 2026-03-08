import React from 'react';

import { View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SparkleImages from '@/shared/images/Sparkle';

const TAB_HEADER_HEIGHT = 56;

const SparkleBackground = () => {
  const { top: safeAreaTop } = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();
  const topOffset = safeAreaTop + TAB_HEADER_HEIGHT;

  return (
    <View
      pointerEvents="none"
      className="absolute items-center justify-center self-center"
      style={{ top: -topOffset, height: screenHeight }}>
      <SparkleImages shape="bg-opacity" width={375} height={736} />
    </View>
  );
};

export default SparkleBackground;

import { useState } from 'react';

import { useWindowDimensions } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';

import { tabAnimationService } from './tabAnimationService';

const INDICATOR_WIDTH = 167;

export const usePicselBookTab = (initialTab: 'my' | 'book' = 'my') => {
  const [activeTab, setActiveTab] = useState<'my' | 'book'>(initialTab);
  const { width: screenWidth } = useWindowDimensions();
  const tabWidth = screenWidth / 2;

  const initialPosition = tabAnimationService.calculateIndicatorPosition(
    initialTab,
    tabWidth,
    INDICATOR_WIDTH,
  );
  const indicatorPosition = useSharedValue(initialPosition);

  const handleTabChange = (tab: 'my' | 'book') => {
    setActiveTab(tab);
    const newPosition = tabAnimationService.calculateIndicatorPosition(
      tab,
      tabWidth,
      INDICATOR_WIDTH,
    );
    indicatorPosition.value = withTiming(
      newPosition,
      tabAnimationService.getAnimationConfig(),
    );
  };

  return {
    activeTab,
    handleTabChange,
    indicatorPosition,
    tabWidth,
    indicatorWidth: INDICATOR_WIDTH,
  };
};

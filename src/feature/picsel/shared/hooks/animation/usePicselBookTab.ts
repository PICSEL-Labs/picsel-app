import { useEffect } from 'react';

import { useWindowDimensions } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';

import { tabAnimationService } from './tabAnimationService';

import { useMyPicselStore } from '@/shared/store/myPicsel';

const INDICATOR_WIDTH = 167;

export const usePicselBookTab = (initialTab: 'my' | 'book' = 'my') => {
  const { activeTab, setActiveTab } = useMyPicselStore();
  const { width: screenWidth } = useWindowDimensions();
  const tabWidth = screenWidth / 2;

  const initialPosition = tabAnimationService.calculateIndicatorPosition(
    initialTab,
    tabWidth,
    INDICATOR_WIDTH,
  );
  const indicatorPosition = useSharedValue(initialPosition);

  useEffect(() => {
    const newPosition = tabAnimationService.calculateIndicatorPosition(
      activeTab,
      tabWidth,
      INDICATOR_WIDTH,
    );
    indicatorPosition.value = withTiming(
      newPosition,
      tabAnimationService.getAnimationConfig(),
    );
  }, [activeTab, tabWidth, indicatorPosition]);

  const handleTabChange = (tab: 'my' | 'book') => {
    setActiveTab(tab);
  };

  return {
    activeTab,
    handleTabChange,
    indicatorPosition,
    tabWidth,
    indicatorWidth: INDICATOR_WIDTH,
  };
};

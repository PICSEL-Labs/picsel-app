import React from 'react';

import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import PicselBookTabContent from '@/feature/picsel/shared/components/layouts/PicselBookTabContent';
import PicselBookTabHeader from '@/feature/picsel/shared/components/layouts/PicselBookTabHeader';
import { usePicselBookTab } from '@/feature/picsel/shared/hooks/animation/usePicselBookTab';

const PicselTabScreen = () => {
  const { activeTab, handleTabChange, indicatorPosition } =
    usePicselBookTab('my');
  const { top } = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: top }}>
      <PicselBookTabHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        indicatorPosition={indicatorPosition}
      />
      <PicselBookTabContent activeTab={activeTab} />
    </View>
  );
};

export default PicselTabScreen;

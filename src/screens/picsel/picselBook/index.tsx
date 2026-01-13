import React from 'react';

import PicselBookTabContent from '@/feature/picsel/shared/components/layouts/PicselBookTabContent';
import PicselBookTabHeader from '@/feature/picsel/shared/components/layouts/PicselBookTabHeader';
import { usePicselBookTab } from '@/feature/picsel/shared/hooks/animation/usePicselBookTab';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

const PicselBookScreen = () => {
  const { activeTab, handleTabChange, indicatorPosition } =
    usePicselBookTab('my');

  return (
    <ScreenLayout>
      <PicselBookTabHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        indicatorPosition={indicatorPosition}
      />
      <PicselBookTabContent activeTab={activeTab} />
    </ScreenLayout>
  );
};

export default PicselBookScreen;

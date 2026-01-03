import React, { useState } from 'react';

import PicselBookTabContent from '@/feature/picsel/shared/components/ui/organisms/PicselBookTabContent';
import PicselBookTabHeader from '@/feature/picsel/shared/components/ui/organisms/PicselBookTabHeader';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

const PicselBookScreen = () => {
  const [activeTab, setActiveTab] = useState<'my' | 'book'>('my');

  return (
    <ScreenLayout>
      <PicselBookTabHeader activeTab={activeTab} onTabChange={setActiveTab} />
      <PicselBookTabContent activeTab={activeTab} />
    </ScreenLayout>
  );
};

export default PicselBookScreen;

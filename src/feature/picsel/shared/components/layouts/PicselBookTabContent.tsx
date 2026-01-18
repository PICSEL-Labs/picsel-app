import React from 'react';

import { View } from 'react-native';

import MyPicselTemplate from '@/feature/picsel/myPicsel/components/ui/template/MyPicselTemplate';
import PicselBookTemplate from '@/feature/picsel/picselBook/components/ui/template/PicselBookTemplate';

interface PicselBookTabContentProps {
  activeTab: 'my' | 'book';
}

const PicselBookTabContent = ({ activeTab }: PicselBookTabContentProps) => {
  return (
    <View className="flex-1">
      {activeTab === 'book' && <PicselBookTemplate />}
      {activeTab === 'my' && <MyPicselTemplate />}
    </View>
  );
};

export default PicselBookTabContent;

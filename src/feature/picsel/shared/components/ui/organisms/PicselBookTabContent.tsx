import React from 'react';

import { View } from 'react-native';

import MyPicselTemplate from '../template/myPicsel/MyPicselTemplate';
import PicselBookTemplate from '../template/picselBook/PicselBookTemplate';

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

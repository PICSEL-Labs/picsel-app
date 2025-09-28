import React from 'react';

import { View } from 'react-native';

import CenterIcons from '@/shared/icons/CenterIcons';
import CornerIcons from '@/shared/icons/CornerIcons';

interface Props {
  boxSize: number;
  frameTop: number;
  frameLeft: number;
}

export const QrScanFrame = ({ boxSize, frameTop, frameLeft }: Props) => (
  <View
    style={{
      position: 'absolute',
      top: frameTop,
      left: frameLeft,
      width: boxSize,
      height: boxSize,
      zIndex: 2,
    }}>
    <View className="absolute left-0 top-0">
      <CornerIcons rotation={0} width={32} height={32} />
    </View>
    <View className="absolute right-0 top-0">
      <CornerIcons rotation={90} width={32} height={32} />
    </View>
    <View className="absolute bottom-0 right-0">
      <CornerIcons rotation={180} width={32} height={32} />
    </View>
    <View className="absolute bottom-0 left-0">
      <CornerIcons rotation={270} width={32} height={32} />
    </View>

    <View className="flex-1 items-center justify-center">
      <CenterIcons shape="pink" width={40} height={40} />
    </View>
  </View>
);

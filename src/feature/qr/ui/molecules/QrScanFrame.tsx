import React from 'react';

import { View } from 'react-native';

import CenterIcons from '@/shared/icons/CenterIcons';
import CornerIcons from '@/shared/icons/CornerIcons';

interface Props {
  boxSize: number;
  frameTop: number;
  frameLeft: number;
}

const corners = [
  { position: 'left-0 top-0', rotation: 0 },
  { position: 'right-0 top-0', rotation: 90 },
  { position: 'bottom-0 right-0', rotation: 180 },
  { position: 'bottom-0 left-0', rotation: 270 },
];

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
    {corners.map(({ position, rotation }, index) => (
      <View key={index} className={`absolute ${position}`}>
        <CornerIcons rotation={rotation} width={32} height={32} />
      </View>
    ))}

    <View className="flex-1 items-center justify-center">
      <CenterIcons shape="pink" width={40} height={40} />
    </View>
  </View>
);

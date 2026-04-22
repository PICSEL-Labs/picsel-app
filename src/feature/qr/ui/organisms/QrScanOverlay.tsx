import React from 'react';

import { Dimensions, View } from 'react-native';

import QrScanHeader from '../layout/QrScanHeader';
import { QrScanBackground } from '../molecules/QrScanBackground';
import QrScanContent from '../molecules/QrScanContent';
import QrScanFooter from '../molecules/QrScanFooter';
import { QrScanFrame } from '../molecules/QrScanFrame';

const { width, height } = Dimensions.get('window');
const BOX_SIZE = width * 0.7;
const FRAME_TOP = (height - BOX_SIZE) / 2.5;
const FRAME_LEFT = (width - BOX_SIZE) / 2;

const QrScanOverlay = () => {
  return (
    <View className="flex-1">
      <QrScanBackground
        width={width}
        height={height}
        boxSize={BOX_SIZE}
        frameTop={FRAME_TOP}
        frameLeft={FRAME_LEFT}
      />

      <View className="z-20 flex-1 items-center justify-between">
        <QrScanHeader />
        <View
          className="absolute items-center"
          style={{
            top: FRAME_TOP - 80, // 프레임 바로 위에 텍스트 배치
          }}>
          <QrScanContent />
        </View>
        <QrScanFrame
          boxSize={BOX_SIZE}
          frameTop={FRAME_TOP}
          frameLeft={FRAME_LEFT}
        />
        <QrScanFooter />
      </View>
    </View>
  );
};

export default QrScanOverlay;

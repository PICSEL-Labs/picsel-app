import React from 'react';

import { Dimensions, View } from 'react-native';

import { QrScanBackground } from '../molecules/QrScanBackground';
import QrScanContent from '../molecules/QrScanContent';
import QrScanFooter from '../molecules/QrScanFooter';
import { QrScanFrame } from '../molecules/QrScanFrame';
import QrScanHeader from '../molecules/QrScanHeader';

const { width, height } = Dimensions.get('window');
const BOX_SIZE = width * 0.7;
const frameTop = (height - BOX_SIZE) / 2;
const frameLeft = (width - BOX_SIZE) / 2;

const QrScanOverlay = () => {
  return (
    <View className="flex-1">
      <QrScanBackground
        width={width}
        height={height}
        boxSize={BOX_SIZE}
        frameTop={frameTop}
        frameLeft={frameLeft}
      />

      <View className="z-20 flex-1 items-center justify-between">
        <QrScanHeader />
        <View
          className="absolute items-center"
          style={{
            top: frameTop - 80, // 프레임 바로 위에 텍스트 배치
          }}>
          <QrScanContent />
        </View>
        <QrScanFrame
          boxSize={BOX_SIZE}
          frameTop={frameTop}
          frameLeft={frameLeft}
        />
        <QrScanFooter />
      </View>
    </View>
  );
};

export default QrScanOverlay;

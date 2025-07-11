import React from 'react';

import SparkleBOpacity from '@/assets/icons/sparkle/sparkle-b-opacity.svg';
import SparkleB from '@/assets/icons/sparkle/sparkle-b.svg';
import SparkleDouble from '@/assets/icons/sparkle/sparkle-double.svg';
import SparkleOff from '@/assets/icons/sparkle/sparkle-off.svg';
import SparkleOn from '@/assets/icons/sparkle/sparkle-on.svg';

interface Props {
  shape: 'on' | 'off' | 'double' | 'b-opacity' | 'big';
  width: number;
  height: number;
}

const SparkleIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'on':
      return <SparkleOn width={width} height={height} />;
    case 'off':
      return <SparkleOff width={width} height={height} />;
    case 'double':
      return <SparkleDouble width={width} height={height} />;
    case 'b-opacity':
      return <SparkleBOpacity width={width} height={height} />;
    case 'big':
      return <SparkleB width={width} height={height} />;
    default:
      return <SparkleOn width={width} height={height} />;
  }
};

export default SparkleIcons;

import React from 'react';

import SparkleDouble from '@/assets/icons/sparkle/sparkle-double.svg';
import SparkleOff from '@/assets/icons/sparkle/sparkle-off.svg';
import SparkleOn from '@/assets/icons/sparkle/sparkle-on.svg';

interface Props {
  shape: 'on' | 'off' | 'double';
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
    default:
      return <SparkleOn width={width} height={height} />;
  }
};

export default SparkleIcons;

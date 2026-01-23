import React from 'react';

import BellOn from '@/assets/icons/bell/icon-bell-on.svg';
import BellOff from '@/assets/icons/bell/icon-bell.svg';

interface Props {
  shape: 'off' | 'on';
  width: number;
  height: number;
}

const BellIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'on':
      return <BellOn width={width} height={height} />;
    case 'off':
      return <BellOff width={width} height={height} />;
    default:
      return <BellOn width={width} height={height} />;
  }
};

export default BellIcons;

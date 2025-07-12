import React from 'react';

import CheckWhite from '@/assets/icons/check/icon-check-white.svg';
import CheckBlack from '@/assets/icons/check/icon-check.svg';

interface Props {
  shape: 'black' | 'white';
  width: number;
  height: number;
}

const CheckIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'black':
      return <CheckBlack width={width} height={height} />;
    case 'white':
      return <CheckWhite width={width} height={height} />;
    default:
      return <CheckBlack width={width} height={height} />;
  }
};

export default CheckIcons;

import React from 'react';

import CloseM from '@/assets/icons/close/icon-closed-M.svg';
import CloseS from '@/assets/icons/close/icon-closed-S.svg';

interface Props {
  shape: 'M' | 'S';
  width: number;
  height: number;
}

const CloseCircleIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'M':
      return <CloseM width={width} height={height} />;
    case 'S':
      return <CloseS width={width} height={height} />;
    default:
      return <CloseM width={width} height={height} />;
  }
};

export default CloseCircleIcons;

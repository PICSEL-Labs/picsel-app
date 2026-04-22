import React from 'react';

import PlusM from '@/assets/icons/plus/icon-plus-M.svg';

interface Props {
  shape: 'M';
  width: number;
  height: number;
}

const PlusCircleIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'M':
      return <PlusM width={width} height={height} />;
    default:
      return <PlusM width={width} height={height} />;
  }
};

export default PlusCircleIcons;

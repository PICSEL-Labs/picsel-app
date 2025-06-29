import React from 'react';

import LocateGray from '@/assets/icons/locate/icon-locate-gray.svg';
import LocateSkyblue from '@/assets/icons/locate/icon-locate-skyblue.svg';

interface Props {
  shape: 'gray' | 'skyblue';
  width: number;
  height: number;
}

const LocateIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'gray':
      return <LocateGray width={width} height={height} />;
    case 'skyblue':
      return <LocateSkyblue width={width} height={height} />;
    default:
      return <LocateGray width={width} height={height} />;
  }
};

export default LocateIcons;

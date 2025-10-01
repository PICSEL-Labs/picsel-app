import React from 'react';

import Center from '@/assets/icons/center/icon-center-pink.svg';

interface Props {
  shape: 'pink';
  width: number;
  height: number;
}
const CenterIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'pink':
      return <Center width={width} height={height} />;
    default:
      return <Center width={width} height={height} />;
  }
};

export default CenterIcons;

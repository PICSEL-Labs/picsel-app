import React from 'react';

import Back from '@/assets/icons/arrow/icon-back.svg';
import Gray from '@/assets/icons/arrow/icon-next-gray.svg';
import Next from '@/assets/icons/arrow/icon-next.svg';

interface Props {
  shape: 'back' | 'next' | 'next-gray';
  width: number;
  height: number;
}

const ArrowIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'back':
      return <Back width={width} height={height} />;
    case 'next':
      return <Next width={width} height={height} />;
    case 'next-gray':
      return <Gray width={width} height={height} />;
    default:
      return <Back width={width} height={height} />;
  }
};

export default ArrowIcons;

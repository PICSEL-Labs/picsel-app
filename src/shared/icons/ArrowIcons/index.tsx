import React from 'react';

import BackWhite from '@/assets/icons/arrow/icon-back-white.svg';
import Back from '@/assets/icons/arrow/icon-back.svg';
import Gray from '@/assets/icons/arrow/icon-next-gray.svg';
import NextPink from '@/assets/icons/arrow/icon-next-pink.svg';
import Next from '@/assets/icons/arrow/icon-next.svg';

interface Props {
  shape: 'back' | 'next' | 'next-gray' | 'next-pink' | 'back-white';
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
    case 'back-white':
      return <BackWhite width={width} height={height} />;
    case 'next-pink':
      return <NextPink width={width} height={height} />;
    default:
      return <Back width={width} height={height} />;
  }
};

export default ArrowIcons;

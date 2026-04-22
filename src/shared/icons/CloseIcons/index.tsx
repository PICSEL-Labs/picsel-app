import React from 'react';

import CloseGray from '@/assets/icons/close/icon-close-gray.svg';
import CloseWhite from '@/assets/icons/close/icon-close-white.svg';
import CloseBlack from '@/assets/icons/close/icon-close.svg';

interface Props {
  shape: 'black' | 'gray' | 'white';
  width: number;
  height: number;
}

const CloseIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'black':
      return <CloseBlack width={width} height={height} />;
    case 'gray':
      return <CloseGray width={width} height={height} />;
    case 'white':
      return <CloseWhite width={width} height={height} />;
    default:
      return <CloseBlack width={width} height={height} />;
  }
};

export default CloseIcons;

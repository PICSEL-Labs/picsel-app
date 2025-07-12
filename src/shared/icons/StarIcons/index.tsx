import React from 'react';

import StarEmpty from '@/assets/icons/star/icon-star-empty.svg';
import StarFill from '@/assets/icons/star/icon-star-fill.svg';

interface Props {
  shape: 'empty' | 'fill';
  width: number;
  height: number;
}

const StarIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'empty':
      return <StarEmpty width={width} height={height} />;
    case 'fill':
      return <StarFill width={width} height={height} />;
    default:
      return <StarEmpty width={width} height={height} />;
  }
};

export default StarIcons;

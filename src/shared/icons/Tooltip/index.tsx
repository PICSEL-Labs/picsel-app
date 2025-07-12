import React from 'react';

import Left from '@/assets/icons/tooltip/tooltip-left.svg';
import Mid from '@/assets/icons/tooltip/tooltip-middle.svg';
import Right from '@/assets/icons/tooltip/tooltip-right.svg';

interface Props {
  shape: 'left' | 'mid' | 'right';
}

const Tooltip = ({ shape }: Props) => {
  switch (shape) {
    case 'left':
      return <Left />;
    case 'mid':
      return <Mid />;
    case 'right':
      return <Right />;
    default:
      return <Left />;
  }
};

export default Tooltip;

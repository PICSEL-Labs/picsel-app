import React from 'react';

import CheckDefault from '@/assets/icons/checkRound/icon-check-default.svg';
import CheckRoundPink from '@/assets/icons/checkRound/icon-check-pink.svg';
import CheckRound from '@/assets/icons/checkRound/icon-check-round.svg';

interface Props {
  shape: 'check-round' | 'default' | 'pink';
  width: number;
  height: number;
}

const CheckRoundIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'check-round':
      return <CheckRound width={width} height={height} />;
    case 'pink':
      return <CheckRoundPink width={width} height={height} />;
    case 'default':
      return <CheckDefault width={width} height={height} />;
    default:
      return <CheckRound width={width} height={height} />;
  }
};

export default CheckRoundIcons;

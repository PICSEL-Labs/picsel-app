import React from 'react';

import CheckDefault from '@/assets/icons/checkRound/icon-check-default.svg';
import CheckRound from '@/assets/icons/checkRound/icon-check-round.svg';

interface Props {
  shape: 'check-round' | 'default';
  width: number;
  height: number;
}

const CheckRoundIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'check-round':
      return <CheckRound width={width} height={height} />;
    case 'default':
      return <CheckDefault width={width} height={height} />;
    default:
      return <CheckRound width={width} height={height} />;
  }
};

export default CheckRoundIcons;

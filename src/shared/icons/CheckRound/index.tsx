import React from 'react';

import CheckRound from '@/assets/icons/checkRound/icon-check-round.svg';

interface Props {
  shape: 'check-round';
  width: number;
  height: number;
}

const CheckRoundIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'check-round':
      return <CheckRound width={width} height={height} />;
    default:
      return <CheckRound width={width} height={height} />;
  }
};

export default CheckRoundIcons;

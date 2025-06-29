import React from 'react';

import ReplayIcon from '@/assets/icons/replay/icon-replay.svg';

interface Props {
  shape: 'default';
  width: number;
  height: number;
}

const ReplayIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'default':
      return <ReplayIcon width={width} height={height} />;
    default:
      return <ReplayIcon width={width} height={height} />;
  }
};

export default ReplayIcons;

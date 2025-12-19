import React from 'react';

import ReplayDark from '@/assets/icons/replay/icon-replay-dark.svg';
import ReplayFalse from '@/assets/icons/replay/icon-replay-false.svg';
import ReplayTrue from '@/assets/icons/replay/icon-replay-true.svg';
import ReplayDefault from '@/assets/icons/replay/icon-replay.svg';

interface Props {
  shape: 'true' | 'false' | 'default' | 'dark';
  width: number;
  height: number;
}

const ReplayIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'true':
      return <ReplayTrue width={width} height={height} />;
    case 'false':
      return <ReplayFalse width={width} height={height} />;
    case 'default':
      return <ReplayDefault width={width} height={height} />;
    case 'dark':
      return <ReplayDark width={width} height={height} />;
    default:
      return <ReplayDefault width={width} height={height} />;
  }
};

export default ReplayIcons;

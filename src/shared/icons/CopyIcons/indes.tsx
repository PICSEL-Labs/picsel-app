import React from 'react';

import CopyIcon from '@/assets/icons/copy/icon-copy.svg';

interface Props {
  shape: 'default';
  width: number;
  height: number;
}

const CopyIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'default':
      return <CopyIcon width={width} height={height} />;

    default:
      return <CopyIcon width={width} height={height} />;
  }
};

export default CopyIcons;

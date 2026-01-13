import React from 'react';

import Delete from '@/assets/icons/picselAction/icon-delete.svg';
import Moving from '@/assets/icons/picselAction/icon-moving.svg';

interface Props {
  shape: 'delete' | 'move';
  width: number;
  height: number;
}

const PicselActionIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'delete':
      return <Delete width={width} height={height} />;
    case 'move':
      return <Moving width={width} height={height} />;
    default:
      return <Delete width={width} height={height} />;
  }
};

export default PicselActionIcons;

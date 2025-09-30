import React from 'react';

import Corner from '@/assets/icons/corner/icon-corner.svg';

interface Props {
  rotation: number;
  width: number;
  height: number;
}

const CornerIcons = ({ rotation, width, height }: Props) => {
  return (
    <Corner
      width={width}
      height={height}
      style={{ transform: [{ rotate: `${rotation}deg` }] }}
    />
  );
};

export default CornerIcons;

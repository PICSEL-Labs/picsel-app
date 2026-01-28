import React from 'react';

import ToggleIcon from '@/assets/icons/toggle/icon-toggle.svg';

interface Props {
  shape: 'down' | 'up';
  width: number;
  height: number;
  color?: string;
}

const ToggleIcons = ({ shape, width, height, color = '#676B79' }: Props) => {
  const rotation = shape === 'up' ? 180 : 0;

  return (
    <ToggleIcon
      width={width}
      height={height}
      color={color}
      style={{ transform: [{ rotate: `${rotation}deg` }] }}
    />
  );
};

export default ToggleIcons;

import React from 'react';

import DropDown from '@/assets/icons/drop/dropdown.svg';
import DropUp from '@/assets/icons/drop/dropup.svg';

interface Props {
  shape: 'down' | 'up';
  width: number;
  height: number;
}

const DropIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'down':
      return <DropDown width={width} height={height} />;
    case 'up':
      return <DropUp width={width} height={height} />;

    default:
      return <DropDown width={width} height={height} />;
  }
};

export default DropIcons;

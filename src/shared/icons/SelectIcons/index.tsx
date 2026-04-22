import React from 'react';

import SelectActive from '@/assets/icons/select/icon-select-active.svg';
import SelectDefault from '@/assets/icons/select/icon-select-default.svg';

interface Props {
  shape: 'active' | 'default';
  width: number;
  height: number;
}

const SelectIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'active':
      return <SelectActive width={width} height={height} />;
    case 'default':
      return <SelectDefault width={width} height={height} />;
  }
};

export default SelectIcons;

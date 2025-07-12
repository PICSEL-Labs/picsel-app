import React from 'react';

import CheckboxBlack from '@/assets/icons/checkbox/icon-checkbox-black.svg';
import CheckboxEmpty from '@/assets/icons/checkbox/icon-checkbox-empty.svg';
import CheckboxGray from '@/assets/icons/checkbox/icon-checkbox-gray.svg';

interface Props {
  shape: 'empty' | 'check-gray' | 'check-black';
  width: number;
  height: number;
}

const CheckboxIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'empty':
      return <CheckboxBlack width={width} height={height} />;
    case 'check-gray':
      return <CheckboxGray width={width} height={height} />;
    case 'check-black':
      return <CheckboxEmpty width={width} height={height} />;
    default:
      return <CheckboxBlack width={width} height={height} />;
  }
};

export default CheckboxIcons;

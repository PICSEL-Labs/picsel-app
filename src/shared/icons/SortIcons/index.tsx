import React from 'react';

import SortIcon from '@/assets/icons/sort/icon-sort.svg';

interface Props {
  shape: 'sort';
  width: number;
  height: number;
}

const SortIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'sort':
      return <SortIcon width={width} height={height} />;
    default:
      return <SortIcon width={width} height={height} />;
  }
};

export default SortIcons;

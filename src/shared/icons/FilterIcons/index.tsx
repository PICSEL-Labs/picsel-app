import React from 'react';

import FilterGray from '@/assets/icons/filter/icon-filter-gray.svg';
import FilterWhite from '@/assets/icons/filter/icon-filter-white.svg';

interface Props {
  shape: 'gray' | 'white';
  width: number;
  height: number;
}

const FilterIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'gray':
      return <FilterGray width={width} height={height} />;
    case 'white':
      return <FilterWhite width={width} height={height} />;
    default:
      return <FilterGray width={width} height={height} />;
  }
};

export default FilterIcons;

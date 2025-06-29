import React from 'react';

import Search from '@/assets/icons/search/icon-search.svg';

interface Props {
  shape: 'default';
  width: number;
  height: number;
}

const SearchIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'default':
      return <Search width={width} height={height} />;
    default:
      return <Search width={width} height={height} />;
  }
};

export default SearchIcons;

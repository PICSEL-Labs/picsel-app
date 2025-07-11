import React from 'react';

import SearchGray from '@/assets/icons/search/icon-search-gray.svg';
import Search from '@/assets/icons/search/icon-search.svg';

interface Props {
  shape: 'black' | 'gray';
  width: number;
  height: number;
}

const SearchIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'black':
      return <Search width={width} height={height} />;
    case 'gray':
      return <SearchGray width={width} height={height} />;
    default:
      return <Search width={width} height={height} />;
  }
};

export default SearchIcons;

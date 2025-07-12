import React from 'react';

import BrandEmpty from '@/assets/icons/brandFav/icon-brand-fav-empty.svg';
import BrandFill from '@/assets/icons/brandFav/icon-brand-fav-fill.svg';
import BrandGray from '@/assets/icons/brandFav/icon-brand-fav-gray.svg';

interface Props {
  shape: 'empty' | 'fill' | 'gray';
  width: number;
  height: number;
}

const BrandFavIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'empty':
      return <BrandEmpty width={width} height={height} />;
    case 'fill':
      return <BrandFill width={width} height={height} />;
    case 'gray':
      return <BrandGray width={width} height={height} />;
    default:
      return <BrandEmpty width={width} height={height} />;
  }
};

export default BrandFavIcons;

import React from 'react';

import AlbumBlack from '@/assets/icons/album/icon-album-black.svg';
import AlbumPink from '@/assets/icons/album/icon-album-pink.svg';

interface Props {
  shape: 'pink' | 'default';
  width: number;
  height: number;
}

const AlbumIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'pink':
      return <AlbumPink width={width} height={height} />;
    case 'default':
      return <AlbumBlack width={width} height={height} />;
    default:
      return <AlbumBlack width={width} height={height} />;
  }
};

export default AlbumIcons;

import React from 'react';

import AlbumBlack from '@/assets/icons/album/icon-album-black.svg';
import AlbumPink from '@/assets/icons/album/icon-album-pink.svg';
import AlbumWhite from '@/assets/icons/album/icon-album-white.svg';

interface Props {
  shape: 'pink' | 'white' | 'default';
  width: number;
  height: number;
}

const AlbumIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'pink':
      return <AlbumPink width={width} height={height} />;
    case 'white':
      return <AlbumWhite width={width} height={height} />;
    case 'default':
      return <AlbumBlack width={width} height={height} />;
    default:
      return <AlbumBlack width={width} height={height} />;
  }
};

export default AlbumIcons;

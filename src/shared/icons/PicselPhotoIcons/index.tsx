import React from 'react';

import PhotoDarkGray from '@/assets/icons/photo/picsel-photo-darkgray.svg';
import PhotoGray from '@/assets/icons/photo/picsel-photo-gray.svg';
import PhotoPink from '@/assets/icons/photo/picsel-photo-pink.svg';

interface Props {
  shape: 'pink' | 'gray' | 'darkgray';
  width: number;
  height: number;
}

const PicselPhotoIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'pink':
      return <PhotoPink width={width} height={height} />;
    case 'gray':
      return <PhotoGray width={width} height={height} />;
    case 'darkgray':
      return <PhotoDarkGray width={width} height={height} />;
    default:
      return <PhotoGray width={width} height={height} />;
  }
};

export default PicselPhotoIcons;

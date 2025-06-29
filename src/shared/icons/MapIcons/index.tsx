import React from 'react';

import MapBBlack from '@/assets/icons/map/map-b-black.svg';
import MapBPink from '@/assets/icons/map/map-b-pink.svg';
import MapFGray from '@/assets/icons/map/map-f-gray.svg';
import MapFPink from '@/assets/icons/map/map-f-pink.svg';

interface Props {
  shape: 'border-black' | 'border-pink' | 'fill-gray' | 'fill-pink';
  width: number;
  height: number;
}

const MapIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'border-black':
      return <MapBBlack width={width} height={height} />;
    case 'border-pink':
      return <MapBPink width={width} height={height} />;
    case 'fill-pink':
      return <MapFPink width={width} height={height} />;
    case 'fill-gray':
      return <MapFGray width={width} height={height} />;
    default:
      return <MapBBlack width={width} height={height} />;
  }
};

export default MapIcons;

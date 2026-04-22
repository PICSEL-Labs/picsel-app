import React from 'react';

import ListMode from '@/assets/icons/viewMode/list.svg';
import TextListMode from '@/assets/icons/viewMode/text-list.svg';

interface Props {
  shape: 'list' | 'text-list';
  width: number;
  height: number;
}

const ViewModeIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'list':
      return <ListMode width={width} height={height} />;
    case 'text-list':
      return <TextListMode width={width} height={height} />;
    default:
      return <ListMode width={width} height={height} />;
  }
};

export default ViewModeIcons;

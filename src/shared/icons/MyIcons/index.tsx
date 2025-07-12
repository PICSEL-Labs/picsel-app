import React from 'react';

import MyGray from '@/assets/icons/my/icon-my-gray.svg';
import MyPink from '@/assets/icons/my/icon-my-pink.svg';

interface Props {
  shape: 'gray' | 'pink';
  width: number;
  height: number;
}

const MyIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'gray':
      return <MyGray width={width} height={height} />;
    case 'pink':
      return <MyPink width={width} height={height} />;
    default:
      return <MyGray width={width} height={height} />;
  }
};

export default MyIcons;

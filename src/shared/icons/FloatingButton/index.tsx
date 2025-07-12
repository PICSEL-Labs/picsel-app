import React from 'react';

import Floating from '@/assets/button/floating.svg';

interface Props {
  shape: 'floating';
}

const FloatingButton = ({ shape }: Props) => {
  switch (shape) {
    case 'floating':
      return <Floating />;

    default:
      return <Floating />;
  }
};

export default FloatingButton;

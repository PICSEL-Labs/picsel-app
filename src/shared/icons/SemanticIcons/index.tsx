import React from 'react';

import SemanticGreen from '@/assets/icons/semantic/icon-semantic-green.svg';
import SemanticPink from '@/assets/icons/semantic/icon-semantic-pink.svg';

interface Props {
  shape: 'green' | 'pink';
  width: number;
  height: number;
}

const SemanticIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'green':
      return <SemanticGreen width={width} height={height} />;
    case 'pink':
      return <SemanticPink width={width} height={height} />;
    default:
      return <SemanticGreen width={width} height={height} />;
  }
};

export default SemanticIcons;

import React from 'react';

import BookAdd from '@/assets/icons/picselBook/picselBook-add.svg';
import BookCoverSelected from '@/assets/icons/picselBook/picselBook-cover-selected.svg';
import BookDefault from '@/assets/icons/picselBook/picselBook-default.svg';

interface Props {
  shape: 'default' | 'add' | 'cover-selected';
  width: number;
  height: number;
}

const PicselBookIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'default':
      return <BookDefault width={width} height={height} />;
    case 'add':
      return <BookAdd width={width} height={height} />;
    case 'cover-selected':
      return <BookCoverSelected width={width} height={height} />;
    default:
      return <BookDefault width={width} height={height} />;
  }
};

export default PicselBookIcons;

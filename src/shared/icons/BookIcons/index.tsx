import React from 'react';

import BookGray from '@/assets/icons/book/icon-book-gray.svg';
import BookPink from '@/assets/icons/book/icon-book-pink.svg';

interface Props {
  shape: 'gray' | 'pink';
  width: number;
  height: number;
}

const BookIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'gray':
      return <BookGray width={width} height={height} />;
    case 'pink':
      return <BookPink width={width} height={height} />;
    default:
      return <BookGray width={width} height={height} />;
  }
};

export default BookIcons;

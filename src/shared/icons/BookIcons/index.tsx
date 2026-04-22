import React from 'react';

import BookFillGray from '@/assets/icons/book/icon-book-fill-gray.svg';
import BookFillPink from '@/assets/icons/book/icon-book-fill-pink.svg';
import BookGray from '@/assets/icons/book/icon-book-gray.svg';
import BookPink from '@/assets/icons/book/icon-book-pink.svg';

interface Props {
  shape: 'gray' | 'pink' | 'fill' | 'fill-gray';
  width: number;
  height: number;
}

const BookIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'gray':
      return <BookGray width={width} height={height} />;
    case 'pink':
      return <BookPink width={width} height={height} />;
    case 'fill':
      return <BookFillPink width={width} height={height} />;
    case 'fill-gray':
      return <BookFillGray width={width} height={height} />;
    default:
      return <BookGray width={width} height={height} />;
  }
};

export default BookIcons;

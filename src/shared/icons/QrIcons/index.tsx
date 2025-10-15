import React from 'react';

import QrPink from '@/assets/icons/qr/icon-qr-fill-pink.svg';
import QrOff1 from '@/assets/icons/qr/icon-qr-primary-off-1.svg';
import QrOff2 from '@/assets/icons/qr/icon-qr-primary-off-2.svg';
import QrOn1 from '@/assets/icons/qr/icon-qr-primary-on-1.svg';
import QrOn2 from '@/assets/icons/qr/icon-qr-primary-on-2.svg';
import QrWhite from '@/assets/icons/qr/icon-qr-white.svg';

interface Props {
  shape: 'off-1' | 'off-2' | 'on-1' | 'on-2' | 'pink' | 'white';
  width: number;
  height: number;
}

const QrIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'off-1':
      return <QrOff1 width={width} height={height} />;
    case 'off-2':
      return <QrOff2 width={width} height={height} />;
    case 'on-1':
      return <QrOn1 width={width} height={height} />;
    case 'on-2':
      return <QrOn2 width={width} height={height} />;
    case 'pink':
      return <QrPink width={width} height={height} />;
    case 'white':
      return <QrWhite width={width} height={height} />;
    default:
      return <QrOff1 width={width} height={height} />;
  }
};

export default QrIcons;

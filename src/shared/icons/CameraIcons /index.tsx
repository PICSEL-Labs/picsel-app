import React from 'react';

import CameraM from '@/assets/icons/camera/icon-camera-M.svg';
import CameraXL from '@/assets/icons/camera/icon-camera-XL.svg';

interface Props {
  shape: 'M' | 'XL';
  width: number;
  height: number;
  color: string;
}

const CameraIcons = ({ shape, width, height, color }: Props) => {
  switch (shape) {
    case 'M':
      return <CameraM width={width} height={height} color={color} />;
    case 'XL':
      return <CameraXL width={width} height={height} color={color} />;
  }
};

export default CameraIcons;

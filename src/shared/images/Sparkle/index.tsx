import React from 'react';

import { Animated, Image } from 'react-native';

import { IMAGES } from '@/shared/constants/images';
import { useBlinkingAnimation } from '@/shared/hooks/useBlinkingAnimation';

interface Props {
  shape: 'icon' | 'bg';
  width?: number;
  height?: number;
  animationType?: boolean;
}

const SparkleImages = ({ shape, width, height, animationType }: Props) => {
  const opacity = useBlinkingAnimation();

  const getImageSource = () => {
    switch (shape) {
      case 'bg':
        return IMAGES.SPARKLE.BACKGROUND;
      case 'icon':
        return IMAGES.SPARKLE.ICON;
      default:
        return IMAGES.SPARKLE.BACKGROUND;
    }
  };

  return animationType ? (
    <Animated.Image
      source={getImageSource()}
      style={{ width, height, opacity }}
      resizeMode="contain"
    />
  ) : (
    <Image
      source={getImageSource()}
      style={{ width, height }}
      resizeMode="contain"
    />
  );
};

export default SparkleImages;

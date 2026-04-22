import React from 'react';

import { Animated, Image } from 'react-native';

import { IMAGES } from '@/shared/constants/images';
import { useBlinkingAnimation } from '@/shared/hooks/useBlinkingAnimation';

interface Props {
  shape: 'icon' | 'bg' | 'bg-opacity' | 'icon-one';
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
      case 'bg-opacity':
        return IMAGES.SPARKLE.BACKGROUND_OPACITY;
      case 'icon':
        return IMAGES.SPARKLE.ICON;
      case 'icon-one':
        return IMAGES.SPARKLE.ICON_ONE;
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

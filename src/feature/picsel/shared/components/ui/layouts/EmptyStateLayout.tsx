import React, { ReactNode } from 'react';

import { ImageBackground, View } from 'react-native';

import { IMAGES } from '@/shared/constants/images';

interface Props {
  children: ReactNode;
  floatingButton: ReactNode;
}

const EmptyStateLayout = ({ children, floatingButton }: Props) => {
  return (
    <ImageBackground
      source={IMAGES.SPARKLE.BACKGROUND_OPACITY}
      className="flex-1"
      resizeMode="contain"
      imageStyle={{ alignSelf: 'center' }}>
      {children}

      <View className="absolute -bottom-4 right-6 space-y-5">
        {floatingButton}
      </View>
    </ImageBackground>
  );
};

export default EmptyStateLayout;

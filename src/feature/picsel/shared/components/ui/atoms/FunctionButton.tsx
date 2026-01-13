import React, { ReactNode } from 'react';

import { Pressable, View } from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

import AlbumIcons from '@/shared/icons/AlbumIcons';
import CloseIcons from '@/shared/icons/CloseIcons';
import QrIcons from '@/shared/icons/QrIcons';
import { insetShadow } from '@/styles/shadows';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface FunctionButtonOption {
  icon: ReactNode;
  onPress: () => void;
}

interface Props {
  onAlbumPress: () => void;
  onQrPress: () => void;
  onClose: () => void;
}

const FunctionButton = ({ onAlbumPress, onQrPress, onClose }: Props) => {
  const buttons: FunctionButtonOption[] = [
    {
      icon: <AlbumIcons shape="white" width={24} height={24} />,
      onPress: onAlbumPress,
    },
    {
      icon: <QrIcons shape="white" width={24} height={24} />,
      onPress: onQrPress,
    },
    {
      icon: <CloseIcons shape="white" width={30} height={30} />,
      onPress: onClose,
    },
  ];

  return (
    <View className="flex-col gap-3">
      {buttons.map((button, index) => (
        <AnimatedPressable
          key={index}
          entering={FadeInUp.delay(index * 50).springify()}
          exiting={FadeOutDown.duration(150)}
          onPress={button.onPress}
          className="h-12 w-12 items-center justify-center self-end rounded-full bg-primary-black shadow-lg"
          style={{
            boxShadow: insetShadow.floatingFunctionButton,
          }}>
          {button.icon}
        </AnimatedPressable>
      ))}
    </View>
  );
};

export default FunctionButton;

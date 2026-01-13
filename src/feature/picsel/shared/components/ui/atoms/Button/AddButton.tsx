import React from 'react';

import { Pressable } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';

import PlusIcon from '@/assets/icons/plus/icon-plus.svg';
import { insetShadow } from '@/shared/styles/shadows';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props {
  onPress: () => void;
}

const AddButton = ({ onPress }: Props) => {
  return (
    <AnimatedPressable
      entering={ZoomIn.springify().delay(150)}
      onPress={onPress}
      className="h-12 w-12 items-center justify-center self-end rounded-full bg-pink-500 shadow-lg"
      style={{
        boxShadow: `${insetShadow.default}, 0 4px 4px 0 rgba(0, 0, 0, 0.10), 0 2px 4px 0 rgba(0, 0, 0, 0.20)`,
      }}>
      <PlusIcon width={28} height={28} fill="white" />
    </AnimatedPressable>
  );
};

export default AddButton;

import React, { ReactNode } from 'react';

import { Modal } from 'react-native';
import { GestureDetector, PanGesture } from 'react-native-gesture-handler';
import Animated, { AnimatedStyle } from 'react-native-reanimated';

import BackDrop from '../BackDrop';

import BottomSheetHeader from './BottomSheetHeader';

interface Props {
  children: ReactNode;
  title: string;
  onClose?: () => void;
  visible: boolean;
  backDrop?: boolean;
  panGesture: PanGesture;
  animatedStyle: AnimatedStyle<{ transform: { translateY: number }[] }>;
}

const BottomSheet = ({
  children,
  onClose,
  visible,
  title,
  panGesture,
  animatedStyle,
  backDrop = false,
}: Props) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      {backDrop && <BackDrop onClose={onClose} />}

      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={animatedStyle}
          className="absolute bottom-0 max-h-[80%] w-full rounded-t-2xl bg-white px-4 pb-8 pt-2">
          <BottomSheetHeader title={title} />

          {children}
        </Animated.View>
      </GestureDetector>
    </Modal>
  );
};

export default BottomSheet;

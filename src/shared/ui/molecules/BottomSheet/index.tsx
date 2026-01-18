import React, { ReactNode } from 'react';

import { Modal, View, ViewStyle } from 'react-native';
import { GestureDetector, PanGesture } from 'react-native-gesture-handler';
import Animated, { AnimatedStyle } from 'react-native-reanimated';

import BackDrop from '../BackDrop';

import BottomSheetHeader from './BottomSheetHeader';

import { bottomSheetShadow } from '@/shared/styles/shadows';

interface Props {
  children: ReactNode;
  title: string;
  onClose?: () => void;
  visible: boolean;
  backDrop?: boolean;
  panGesture: PanGesture;
  animatedStyle: AnimatedStyle<ViewStyle>;
  headerRight?: ReactNode;
}

const BottomSheet = ({
  children,
  onClose,
  visible,
  title,
  panGesture,
  animatedStyle,
  backDrop = false,
  headerRight,
}: Props) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      {backDrop && <BackDrop onClose={onClose} />}

      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[animatedStyle, bottomSheetShadow]}
          className="absolute bottom-0 w-full rounded-t-2xl bg-white px-4 pb-8 pt-2">
          <View className="flex-1 flex-col">
            <BottomSheetHeader title={title} right={headerRight} />
            {children}
          </View>
        </Animated.View>
      </GestureDetector>
    </Modal>
  );
};

export default BottomSheet;

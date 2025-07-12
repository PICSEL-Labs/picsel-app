import { useEffect } from 'react';
import { SetStateAction } from 'react';

import { Gesture } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface Props {
  visible: boolean;
  onClose: () => void;
  setCheckedStates: (value: SetStateAction<boolean[]>) => void;
}

export const useModalService = ({
  visible,
  onClose,
  setCheckedStates,
}: Props) => {
  const translateY = useSharedValue(0);

  // 드래그 제스처 정의
  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      if (event.y < 50) {
        return;
      }
      translateY.value = event.translationY;
    })
    .onEnd(event => {
      if (event.translationY > 200) {
        runOnJS(onClose)();
      } else {
        translateY.value = withSpring(0);
      }
    });

  // 열릴 때 초기화
  useEffect(() => {
    if (visible) {
      setCheckedStates([false, false, false, false, false]);
      translateY.value = 0;
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return {
    panGesture,
    animatedStyle,
  };
};

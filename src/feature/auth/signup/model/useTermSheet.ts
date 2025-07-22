import { Dispatch, SetStateAction, useEffect } from 'react';

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
  setCheckedStates: Dispatch<SetStateAction<boolean[]>>;
}

export const useTermSheet = ({ visible, onClose, setCheckedStates }: Props) => {
  const translateY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      // 아래쪽으로만 드래그 허용
      if (event.translationY < 0) {
        return;
      }
      translateY.value = event.translationY;
    })
    .onEnd(event => {
      if (event.translationY > 200) {
        // 바텀시트 닫기
        runOnJS(onClose)();
      } else {
        // 원위치로 복귀
        translateY.value = withSpring(0);
      }
    });

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

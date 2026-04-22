import { useEffect } from 'react';

import { Gesture } from 'react-native-gesture-handler';
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { HEIGHT } from '@/shared/constants/size';
import { useFilteredBrandsStore } from '@/shared/store/brand/filterBrands';
import { useBrandFilterSheetStore } from '@/shared/store/ui/brandFilterSheet';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const SNAP_POINTS = {
  FULL: HEIGHT * 0.9, // 바텀 시트의 높이가 90%
  HALF: HEIGHT * 0.65, // 바텀 시트의 높이가 65%
  HIDDEN: 0, // 바텀 시트가 사라진 상태
};

const DRAG_CLOSE_THRESHOLD = 150;

export const useBrandFilterSheet = ({ visible, onClose }: Props) => {
  const translateY = useSharedValue(SNAP_POINTS.HIDDEN);
  const { resetFilter, syncTempFromApplied } = useFilteredBrandsStore();
  const { source } = useBrandFilterSheetStore();
  const midpoint = (SNAP_POINTS.HALF + SNAP_POINTS.FULL) / 2;

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      const nextHeight = translateY.value - event.translationY;
      if (nextHeight < SNAP_POINTS.HIDDEN || nextHeight > SNAP_POINTS.FULL) {
        return;
      }

      translateY.value = nextHeight;
    })
    .onEnd(event => {
      const dragDistance = event.translationY;

      const targetHeight = translateY.value - dragDistance;

      if (dragDistance > DRAG_CLOSE_THRESHOLD) {
        runOnJS(onClose)(); // 충분히 아래로 드래그했으면 닫기
      } else if (targetHeight < midpoint) {
        translateY.value = withSpring(SNAP_POINTS.HALF);
      } else {
        translateY.value = withSpring(SNAP_POINTS.FULL);
      }
    });

  useEffect(() => {
    if (visible) {
      syncTempFromApplied(source);
      translateY.value = withSpring(SNAP_POINTS.HALF);
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: translateY.value,
  }));

  const handleReset = () => {
    resetFilter();
  };

  return {
    panGesture,
    animatedStyle,

    handleReset,
  };
};

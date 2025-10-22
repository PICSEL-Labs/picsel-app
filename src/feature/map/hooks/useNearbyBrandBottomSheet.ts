import { useEffect, useMemo, useRef } from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import { Easing } from 'react-native-reanimated';

interface Props {
  visible: boolean;
  showSheet: () => void;
  hideSheet: () => void;
}

export const useNearbyBrandBottomSheet = ({
  visible,
  showSheet,
  hideSheet,
}: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['5%', '25%'], []);

  const animationConfigs = useMemo(
    () => ({
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }),
    [],
  );

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.snapToIndex(1);
    } else {
      bottomSheetRef.current?.snapToIndex(0);
    }
  }, [visible]);

  const handleSheetChange = (index: number) => {
    if (index === 0) {
      hideSheet();
    } else {
      showSheet();
    }
  };

  return {
    bottomSheetRef,
    snapPoints,
    animationConfigs,
    handleSheetChange,
  };
};

import { useMemo, useRef } from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import { Easing } from 'react-native-reanimated';

interface Props {
  hideSheet: () => void;
}

export const useEmptyBottomSheet = ({ hideSheet }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const animationConfigs = useMemo(
    () => ({
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }),
    [],
  );

  const handleSheetChange = (index: number) => {
    if (index === -1) {
      hideSheet();
    }
  };

  return {
    bottomSheetRef,
    animationConfigs,
    handleSheetChange,
  };
};

import { useCallback, useEffect, useMemo, useRef } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Keyboard, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  visible: boolean;
}

export const useLocationSearchBottomSheet = ({ visible }: Props) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();

  const snapPoints = useMemo(
    () => [screenHeight - insets.top],
    [screenHeight, insets.top],
  );

  const handleAnimate = useCallback((_fromIndex: number, toIndex: number) => {
    if (toIndex === -1) {
      Keyboard.dismiss();
    }
  }, []);

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [visible]);

  return {
    bottomSheetRef,
    snapPoints,
    handleAnimate,
    insets,
  };
};

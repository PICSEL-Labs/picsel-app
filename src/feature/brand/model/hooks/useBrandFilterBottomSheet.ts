import { useEffect, useMemo, useRef } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Easing } from 'react-native-reanimated';

import { useFilteredBrandsStore } from '@/shared/store/brand/filterBrands';

interface Props {
  visible: boolean;
  showSheet?: () => void;
  hideSheet?: () => void;
}

export const useBrandFilterBottomSheet = ({ visible, hideSheet }: Props) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { resetFilter } = useFilteredBrandsStore();

  const snapPoints = useMemo(() => ['60%', '80%'], []);

  const animationConfigs = useMemo(
    () => ({
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }),
    [],
  );

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.present();
      resetFilter();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [visible]);

  const handleSheetChange = (index: number) => {
    if (index === -1) {
      hideSheet();
    }
  };

  return {
    bottomSheetRef,
    snapPoints,
    animationConfigs,
    handleSheetChange,
  };
};

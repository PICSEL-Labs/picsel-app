import { useEffect, useRef } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';

interface Props {
  visible: boolean;
}

export const useDatePickerBottomSheet = ({ visible }: Props) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [visible]);

  return {
    bottomSheetRef,
  };
};

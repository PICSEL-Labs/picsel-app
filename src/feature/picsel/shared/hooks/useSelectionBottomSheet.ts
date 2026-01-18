import { useEffect, useRef } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';

export const useSelectionBottomSheet = (isSelecting: boolean) => {
  const selectionBottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (isSelecting) {
      selectionBottomSheetRef.current?.present();
    } else {
      selectionBottomSheetRef.current?.dismiss();
    }
  }, [isSelecting]);

  return { selectionBottomSheetRef };
};

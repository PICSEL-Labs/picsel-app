import { useEffect, useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';

interface Props {
  visible: boolean;
}

export const useBrandDetailBottomSheet = ({ visible }: Props) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [openCopy, setOpenCopy] = useState(false);

  useEffect(() => {
    if (visible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
      setOpenCopy(false);
    }
  }, [visible]);

  return {
    bottomSheetModalRef,
    openCopy,
    setOpenCopy,
  };
};

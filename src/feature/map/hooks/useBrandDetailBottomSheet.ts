import { useEffect, useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { StoreDetail } from '../ui/organisms/BrandDetailBottomSheet/BrandDetailContent';

interface Props {
  visible: boolean;
  storeDetail: StoreDetail | null;
}

export const useBrandDetailBottomSheet = ({ visible, storeDetail }: Props) => {
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

  useEffect(() => {
    setOpenCopy(false);
  }, [storeDetail?.storeId]);

  return {
    bottomSheetModalRef,
    openCopy,
    setOpenCopy,
  };
};

import { useEffect, useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Clipboard from '@react-native-clipboard/clipboard';

import { StoreDetail } from '../types';

import { useToastStore } from '@/shared/store/ui/toast';

interface Props {
  visible: boolean;
  storeDetail: StoreDetail | null;
}

export const useBrandDetailBottomSheet = ({ visible, storeDetail }: Props) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [openCopy, setOpenCopy] = useState(false);
  const { showToast } = useToastStore();

  const lastStoreIdRef = useRef<string | null>(null);

  useEffect(() => {
    const shouldOpen = visible && storeDetail;
    const shouldClose = !visible;

    if (shouldClose) {
      bottomSheetModalRef.current?.close();
      lastStoreIdRef.current = null;
      setOpenCopy(false);
      return;
    }

    if (shouldOpen) {
      const isDifferentStore = lastStoreIdRef.current !== storeDetail.storeId;

      if (isDifferentStore) {
        bottomSheetModalRef.current?.present();
        lastStoreIdRef.current = storeDetail.storeId;
      }
    }
  }, [visible, storeDetail?.storeId]);

  useEffect(() => {
    setOpenCopy(false);
  }, [storeDetail?.storeId]);

  const handleCopyButton = () => {
    setOpenCopy(prev => !prev);
  };

  const handleCopyAddress = (copyAddress: string) => {
    Clipboard.setString(copyAddress);
    showToast('주소를 복사했어요', 75);
  };

  return {
    bottomSheetModalRef,
    openCopy,
    setOpenCopy,
    handleCopyButton,
    handleCopyAddress,
  };
};

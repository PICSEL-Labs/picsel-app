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

  const isOpenRef = useRef(false);
  const lastStoreIdRef = useRef<string | null>(null);
  const lastActionTimeRef = useRef(0);

  useEffect(() => {
    const now = Date.now();

    if (now - lastActionTimeRef.current < 300) {
      return;
    }

    const shouldOpen = visible && storeDetail;
    const shouldClose = !visible && isOpenRef.current;

    if (shouldOpen) {
      const isDifferentStore = lastStoreIdRef.current !== storeDetail.storeId;

      if (!isOpenRef.current || isDifferentStore) {
        lastActionTimeRef.current = now;
        bottomSheetModalRef.current?.present();
        isOpenRef.current = true;
        lastStoreIdRef.current = storeDetail.storeId;
      }
    } else if (shouldClose) {
      lastActionTimeRef.current = now;
      bottomSheetModalRef.current?.dismiss();
      isOpenRef.current = false;
      lastStoreIdRef.current = null;
      setOpenCopy(false);
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

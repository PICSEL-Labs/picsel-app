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

  const handleCopyButton = () => {
    if (!openCopy) {
    }
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

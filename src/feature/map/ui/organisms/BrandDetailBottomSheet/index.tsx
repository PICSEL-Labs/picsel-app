import React, { useEffect, useRef, useState } from 'react';

import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { View } from 'react-native';

import BottomSheetBrandImage from '../../atoms/BottomSheetBrandImage';
import QrSaveButton from '../../atoms/QrSaveButton';

import BrandDetailInfo from './BrandDetailInfo';
import CopyAddress from './CopyAddress';

import { bottomSheetIndicator } from '@/styles/bottomSheetIndicator';
import { bottomSheetShadow } from '@/styles/shadows';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const BrandDetailBottomSheet = ({ visible, onClose }: Props) => {
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

  return (
    <BottomSheetModal
      style={bottomSheetShadow}
      ref={bottomSheetModalRef}
      enablePanDownToClose={true}
      handleIndicatorStyle={bottomSheetIndicator}
      onDismiss={onClose}
      backgroundStyle={{ borderRadius: 24 }}>
      <BottomSheetView>
        <View className="mt-1 h-[270px] flex-1 items-center justify-center">
          <BottomSheetBrandImage imageUrl="/img/brand/logo/default.jpg" />

          <BrandDetailInfo
            brandName="하루필름 부산서면점"
            detailAddress="부산 부산진구 중앙대로"
            location="349m"
            setOpenCopy={setOpenCopy}
            openCopy={openCopy}
          />

          {openCopy && (
            <CopyAddress address="부산 부산진구 중앙대로702번길 19" />
          )}

          <View className="mb-2 py-4">
            <QrSaveButton />
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default BrandDetailBottomSheet;

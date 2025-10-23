import React from 'react';

import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

import BrandDetailContent, { StoreDetail } from './BrandDetailContent';

import { useBrandDetailBottomSheet } from '@/feature/map/hooks/useBrandDetailBottomSheet';
import { bottomSheetIndicator } from '@/styles/bottomSheetIndicator';
import { bottomSheetShadow } from '@/styles/shadows';

interface Props {
  visible: boolean;
  storeDetail: StoreDetail | null;
  onClose: () => void;
}

const BrandDetailBottomSheet = ({ visible, storeDetail, onClose }: Props) => {
  const { bottomSheetModalRef, openCopy, setOpenCopy } =
    useBrandDetailBottomSheet({ visible });

  if (!storeDetail) {
    return null;
  }

  return (
    <BottomSheetModal
      style={bottomSheetShadow}
      ref={bottomSheetModalRef}
      enablePanDownToClose={true}
      handleIndicatorStyle={bottomSheetIndicator}
      onDismiss={onClose}
      backgroundStyle={{ borderRadius: 24 }}>
      <BottomSheetView>
        <BrandDetailContent
          storeDetail={storeDetail}
          openCopy={openCopy}
          setOpenCopy={setOpenCopy}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default BrandDetailBottomSheet;

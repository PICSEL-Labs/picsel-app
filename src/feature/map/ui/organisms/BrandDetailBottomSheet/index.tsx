import React from 'react';

import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

import BrandDetailContent from './BrandDetailContent';

import { useBrandDetailBottomSheet } from '@/feature/map/hooks/useBrandDetailBottomSheet';
import { StoreDetail } from '@/feature/map/types';
import { bottomSheetIndicator } from '@/styles/bottomSheetIndicator';
import { bottomSheetShadow } from '@/styles/shadows';

interface Props {
  visible: boolean;
  storeDetail: StoreDetail | null;
  onClose: () => void;
  isFavorite: boolean;
}

const BrandDetailBottomSheet = ({
  visible,
  storeDetail,
  onClose,
  isFavorite,
}: Props) => {
  const { bottomSheetModalRef, openCopy, handleCopyButton, handleCopyAddress } =
    useBrandDetailBottomSheet({
      visible,
      storeDetail,
    });

  if (!storeDetail) {
    return null;
  }

  return (
    <BottomSheetModal
      style={bottomSheetShadow}
      ref={bottomSheetModalRef}
      handleIndicatorStyle={bottomSheetIndicator}
      onDismiss={onClose}
      backgroundStyle={{ borderRadius: 24 }}>
      <BottomSheetView>
        <BrandDetailContent
          brandId={storeDetail.brandId}
          isFavorite={isFavorite}
          storeDetail={storeDetail}
          openCopy={openCopy}
          handleCopyButton={handleCopyButton}
          handleCopyAddress={handleCopyAddress}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default BrandDetailBottomSheet;

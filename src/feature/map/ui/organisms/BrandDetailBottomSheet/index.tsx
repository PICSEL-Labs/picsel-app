import React, { useRef, useEffect } from 'react';

import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

import BrandDetailContent from './BrandDetailContent';

import { useBrandDetailBottomSheet } from '@/feature/map/hooks/useBrandDetailBottomSheet';
import { StoreDetail } from '@/feature/map/types';
import { bottomSheetIndicator } from '@/shared/styles/bottomSheetIndicator';
import { bottomSheetShadow } from '@/shared/styles/shadows';

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

  // 이전 storeDetail 값을 유지 (바텀시트가 닫히는 동안 내용 유지)
  const lastStoreDetailRef = useRef<StoreDetail | null>(null);

  useEffect(() => {
    if (storeDetail) {
      lastStoreDetailRef.current = storeDetail;
    }
  }, [storeDetail]);

  const displayStoreDetail = storeDetail || lastStoreDetailRef.current;

  if (!displayStoreDetail) {
    return null;
  }

  // visible 상태와 관계없이 항상 렌더링
  // present()/close()로만 제어됨
  return (
    <BottomSheetModal
      style={bottomSheetShadow}
      ref={bottomSheetModalRef}
      handleIndicatorStyle={bottomSheetIndicator}
      onDismiss={onClose}
      backgroundStyle={{ borderRadius: 24 }}
      enableDynamicSizing>
      <BottomSheetView>
        <BrandDetailContent
          brandId={displayStoreDetail.brandId}
          isFavorite={isFavorite}
          storeDetail={displayStoreDetail}
          openCopy={openCopy}
          handleCopyButton={handleCopyButton}
          handleCopyAddress={handleCopyAddress}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default BrandDetailBottomSheet;

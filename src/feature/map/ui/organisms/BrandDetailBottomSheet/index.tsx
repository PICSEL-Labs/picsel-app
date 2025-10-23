import React, { useEffect, useRef, useState } from 'react';

import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { View } from 'react-native';

import BottomSheetBrandImage from '../../atoms/BottomSheetBrandImage';
import QrSaveButton from '../../atoms/QrSaveButton';

import BrandDetailInfo from './BrandDetailInfo';
import CopyAddress from './CopyAddress';

import { bottomSheetIndicator } from '@/styles/bottomSheetIndicator';
import { bottomSheetShadow } from '@/styles/shadows';

interface StoreDetail {
  storeId: string;
  storeName: string;
  brandName: string;
  address: string;
  distance: number;
  brandIconImageUrl: string;
}

interface Props {
  visible: boolean;
  storeDetail: StoreDetail | null;
  onClose: () => void;
}

const BrandDetailBottomSheet = ({ visible, storeDetail, onClose }: Props) => {
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

  if (!storeDetail) {
    return null;
  }

  console.log(storeDetail);

  const splitAddress = (fullAddress: string) => {
    const parts = fullAddress.split(' ');
    if (parts.length > 3) {
      return {
        location: parts.slice(0, 3).join(' '),
      };
    }
    return {
      location: fullAddress,
    };
  };

  const { location } = splitAddress(storeDetail.address);
  const distanceText = `${Math.round(storeDetail.distance * 1000)}m`;

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
          <BottomSheetBrandImage imageUrl={storeDetail.brandIconImageUrl} />

          <BrandDetailInfo
            brandName={storeDetail.storeName}
            distance={distanceText}
            location={location}
            setOpenCopy={setOpenCopy}
            openCopy={openCopy}
          />

          {openCopy && <CopyAddress address={storeDetail.address} />}

          <View className="mb-2 py-4">
            <QrSaveButton />
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default BrandDetailBottomSheet;

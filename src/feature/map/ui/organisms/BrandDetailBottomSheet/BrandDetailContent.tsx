import React, { Dispatch, SetStateAction } from 'react';

import { View } from 'react-native';

import BottomSheetBrandImage from '../../atoms/BottomSheetBrandImage';
import QrSaveButton from '../../atoms/QrSaveButton';

import BrandDetailInfo from './BrandDetailInfo';
import CopyAddress from './CopyAddress';

import { formatDistance, splitAddress } from '@/feature/map/utils/addressUtils';

export interface StoreDetail {
  storeId: string;
  storeName: string;
  brandName: string;
  address: string;
  distance: number;
  brandIconImageUrl: string;
}

interface Props {
  storeDetail: StoreDetail;
  openCopy: boolean;
  setOpenCopy: Dispatch<SetStateAction<boolean>>;
}

const BrandDetailContent = ({ storeDetail, openCopy, setOpenCopy }: Props) => {
  const { location, detailLocation } = splitAddress(storeDetail.address);
  const distanceText = formatDistance(storeDetail.distance);

  return (
    <View className="mt-1 h-[270px] flex-1 items-center justify-center">
      <BottomSheetBrandImage imageUrl={storeDetail.brandIconImageUrl} />

      <BrandDetailInfo
        brandName={storeDetail.storeName}
        distance={distanceText}
        location={location}
        setOpenCopy={setOpenCopy}
        openCopy={openCopy}
      />

      {openCopy && <CopyAddress detailLocation={detailLocation} />}

      <View className="mb-2 py-4">
        <QrSaveButton />
      </View>
    </View>
  );
};

export default BrandDetailContent;

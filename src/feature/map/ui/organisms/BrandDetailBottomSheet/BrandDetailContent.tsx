import React from 'react';

import { View } from 'react-native';

import BottomSheetBrandImage from '../../atoms/BottomSheetBrandImage';
import QrSaveButton from '../../atoms/QrSaveButton';

import BrandDetailInfo from './BrandDetailInfo';
import CopyAddress from './CopyAddress';

import { MapBottomSheetProps, StoreDetail } from '@/feature/map/types';
import { formatDistance, splitAddress } from '@/feature/map/utils/addressUtils';

interface Props extends MapBottomSheetProps {
  storeDetail: StoreDetail;
  openCopy: boolean;
  handleCopyButton: () => void;
  handleCopyAddress: (address: string) => void;
}

const BrandDetailContent = ({
  storeDetail,
  brandId,
  isFavorite,
  openCopy,
  handleCopyButton,
  handleCopyAddress,
}: Props) => {
  const { location, detailLocation } = splitAddress(storeDetail.address);
  const distanceText = formatDistance(storeDetail.distance);

  return (
    <View className="mt-1 h-[270px] flex-1 items-center justify-center">
      <BottomSheetBrandImage
        brandId={brandId}
        isFavorite={isFavorite}
        imageUrl={storeDetail.brandIconImageUrl}
      />

      <BrandDetailInfo
        brandName={storeDetail.storeName}
        distance={distanceText}
        location={location}
        openCopy={openCopy}
        handleCopyButton={handleCopyButton}
      />

      {openCopy && (
        <CopyAddress
          copyAddress={storeDetail.address}
          detailLocation={detailLocation}
          handleCopyAddress={handleCopyAddress}
        />
      )}

      <View className="mb-2 py-4">
        <QrSaveButton />
      </View>
    </View>
  );
};

export default BrandDetailContent;

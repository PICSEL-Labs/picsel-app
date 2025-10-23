import React from 'react';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Text } from 'react-native';

import NearbyBrandEmptyState from './NearbyBrandEmptyState';
import NearbyBrandList from './NearbyBrandList';

import { useNearbyBrandBottomSheet } from '@/feature/map/hooks/useNearbyBrandBottomSheet';
import { NearByBrand } from '@/feature/map/types';
import { bottomSheetIndicator } from '@/styles/bottomSheetIndicator';
import { bottomSheetShadow } from '@/styles/shadows';

interface Props {
  visible: boolean;
  brands?: NearByBrand[];
  showSheet: () => void;
  hideSheet: () => void;
}

const NearbyBrandBottomSheet = ({
  showSheet,
  hideSheet,
  visible,
  brands,
}: Props) => {
  const { bottomSheetRef, snapPoints, animationConfigs, handleSheetChange } =
    useNearbyBrandBottomSheet({
      visible,
      showSheet,
      hideSheet,
    });

  const renderContent = () => {
    if (!brands) {
      return null;
    }
    if (brands.length === 0) {
      return <NearbyBrandEmptyState />;
    }
    return <NearbyBrandList brands={brands} />;
  };

  return (
    <BottomSheet
      style={bottomSheetShadow}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      handleIndicatorStyle={bottomSheetIndicator}
      index={0}
      onChange={handleSheetChange}
      animateOnMount={false}
      enableOverDrag={false}
      animationConfigs={animationConfigs}
      enablePanDownToClose={false}
      backgroundStyle={{ borderRadius: 24 }}>
      <BottomSheetView>
        <Text className="mb-2 text-center text-gray-900 title-01">
          이 근처 브랜드
        </Text>

        {renderContent()}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default NearbyBrandBottomSheet;

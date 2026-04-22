import React from 'react';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Text } from 'react-native';

import BrandEmptyState from './BrandEmptyState';

import { useEmptyBottomSheet } from '@/feature/map/hooks/useEmptyBottomSheet';
import { BrandDetail } from '@/feature/map/types';
import { bottomSheetIndicator } from '@/shared/styles/bottomSheetIndicator';
import { bottomSheetShadow } from '@/shared/styles/shadows';

interface Props {
  visible: boolean;
  brands?: BrandDetail[];
  hideSheet: () => void;
}

const EmptyBottomSheet = ({ hideSheet, visible, brands }: Props) => {
  const { bottomSheetRef, animationConfigs, handleSheetChange } =
    useEmptyBottomSheet({
      hideSheet,
    });

  const isEmpty = brands && brands.length === 0;

  return (
    isEmpty && (
      <BottomSheet
        snapPoints={['25%']}
        index={visible ? 0 : -1}
        style={bottomSheetShadow}
        ref={bottomSheetRef}
        handleIndicatorStyle={bottomSheetIndicator}
        onChange={handleSheetChange}
        enableOverDrag={false}
        enablePanDownToClose
        animationConfigs={animationConfigs}
        backgroundStyle={{ borderRadius: 24 }}>
        <BottomSheetView>
          <Text className="mb-2 text-center text-gray-900 title-01">
            이 근처 브랜드
          </Text>
          <BrandEmptyState />
        </BottomSheetView>
      </BottomSheet>
    )
  );
};

export default EmptyBottomSheet;

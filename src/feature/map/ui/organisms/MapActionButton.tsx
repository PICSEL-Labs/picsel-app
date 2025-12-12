import React, { Dispatch, SetStateAction, useCallback } from 'react';

import { Animated, View } from 'react-native';

import BrandFilterButton from './BrandFilterBottomSheet/BrandFilterButton';
import CurrentLocationSearch from './CurrentLocationSearch';

import { useMapLocationStore } from '@/shared/store';

interface Props {
  activeButton: 'brand' | 'location';
  setActiveButton: Dispatch<SetStateAction<'brand' | 'location'>>;
  handleLocationSearch: () => void;
  detailHideSheet: () => void;
  emptyHideSheet: () => void;
  showFilterSheet: () => void;
  brandFilterVisible: boolean;
  hideFilterSheet: () => void;
  showBrandTooltip: boolean;
  fadeAnim: Animated.Value;
}

const MapActionButton = ({
  setActiveButton,
  activeButton,
  handleLocationSearch,
  showFilterSheet,
  brandFilterVisible,
  detailHideSheet,
  emptyHideSheet,
  hideFilterSheet,
  showBrandTooltip,
  fadeAnim,
}: Props) => {
  const { mapMode } = useMapLocationStore();

  const handleModal = useCallback(() => {
    if (brandFilterVisible) {
      hideFilterSheet();
    } else {
      detailHideSheet();
      emptyHideSheet();
      showFilterSheet();
      setActiveButton('brand');
    }
  }, [
    brandFilterVisible,
    hideFilterSheet,
    showFilterSheet,
    detailHideSheet,
    emptyHideSheet,
    setActiveButton,
  ]);

  return (
    <View className="relative flex-row justify-center">
      <View className="absolute left-0">
        <BrandFilterButton
          variant={brandFilterVisible ? 'active' : 'inactive'}
          onPress={handleModal}
          showTooltip={showBrandTooltip}
          fadeAnim={fadeAnim}
        />
      </View>
      {mapMode === 'default' && activeButton === 'location' && (
        <CurrentLocationSearch onLocationSearch={handleLocationSearch} />
      )}
    </View>
  );
};

export default MapActionButton;

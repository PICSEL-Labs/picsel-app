import React, { Dispatch, SetStateAction, useCallback } from 'react';

import { Animated } from 'react-native';

import CurrentLocationSearch from './CurrentLocationSearch';

import BrandFilterButton from '@/feature/brand/ui/organisms/BrandFilterButton';
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

  return activeButton === 'brand' || mapMode === 'search' ? (
    <BrandFilterButton
      variant={brandFilterVisible ? 'active' : 'inactive'}
      onPress={handleModal}
      showTooltip={showBrandTooltip}
      fadeAnim={fadeAnim}
    />
  ) : (
    mapMode === 'default' && (
      <CurrentLocationSearch onLocationSearch={handleLocationSearch} />
    )
  );
};

export default MapActionButton;

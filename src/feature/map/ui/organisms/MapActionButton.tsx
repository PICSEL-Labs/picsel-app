import React, { Dispatch, SetStateAction, useCallback } from 'react';

import { Animated } from 'react-native';

import CurrentLocationSearch from './CurrentLocationSearch';

import BrandFilterButton from '@/feature/brand/ui/organisms/BrandFilterButton';

interface Props {
  activeButton: 'brand' | 'location';
  setActiveButton: Dispatch<SetStateAction<'brand' | 'location'>>;
  handleLocationSearch: () => void;
  detailHideSheet: () => void;
  nearbyHideSheet: () => void;
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
  nearbyHideSheet,
  hideFilterSheet,
  showBrandTooltip,
  fadeAnim,
}: Props) => {
  const handleModal = useCallback(() => {
    if (brandFilterVisible) {
      hideFilterSheet();
    } else {
      detailHideSheet();
      nearbyHideSheet();
      showFilterSheet();
      setActiveButton('brand');
    }
  }, [
    brandFilterVisible,
    hideFilterSheet,
    showFilterSheet,
    detailHideSheet,
    nearbyHideSheet,
    setActiveButton,
  ]);

  return activeButton === 'brand' ? (
    <BrandFilterButton
      variant={brandFilterVisible ? 'active' : 'inactive'}
      onPress={handleModal}
      showTooltip={showBrandTooltip}
      fadeAnim={fadeAnim}
    />
  ) : (
    <CurrentLocationSearch onLocationSearch={handleLocationSearch} />
  );
};

export default MapActionButton;

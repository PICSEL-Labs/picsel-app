import React, { Dispatch, SetStateAction, useCallback } from 'react';

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
    />
  ) : (
    <CurrentLocationSearch onLocationSearch={handleLocationSearch} />
  );
};

export default MapActionButton;

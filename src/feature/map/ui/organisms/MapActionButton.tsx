import React, { Dispatch, SetStateAction, useCallback } from 'react';

import CurrentLocationSearch from './CurrentLocationSearch';

import BrandFilterButton from '@/feature/brand/ui/organisms/BrandFilterButton';
import { useMapLocationStore } from '@/shared/store';

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
  const { mapMode } = useMapLocationStore();

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

  return activeButton === 'brand' || mapMode === 'search' ? (
    <BrandFilterButton
      variant={brandFilterVisible ? 'active' : 'inactive'}
      onPress={handleModal}
    />
  ) : (
    mapMode === 'default' && (
      <CurrentLocationSearch onLocationSearch={handleLocationSearch} />
    )
  );
};

export default MapActionButton;

import React, { Dispatch, SetStateAction, useCallback } from 'react';

import CurrentLocationSearch from './CurrentLocationSearch';

import BrandFilterButton from '@/feature/brand/ui/organisms/BrandFilterButton';
import { useMapLocationStore } from '@/shared/store';

interface Props {
  activeButton: 'brand' | 'location';
  setActiveButton: Dispatch<SetStateAction<'brand' | 'location'>>;
  handleLocationSearch: () => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  detailHideSheet: () => void;
  nearbyHideSheet: () => void;
}

const MapActionButton = ({
  setActiveButton,
  activeButton,
  handleLocationSearch,
  isModalOpen,
  openModal,
  closeModal,
  detailHideSheet,
  nearbyHideSheet,
}: Props) => {
  const { mapMode } = useMapLocationStore();

  const handleModal = useCallback(() => {
    if (isModalOpen) {
      closeModal();
    } else {
      detailHideSheet();
      nearbyHideSheet();
      openModal();
      setActiveButton('brand');
    }
  }, [isModalOpen, openModal, closeModal, setActiveButton]);

  return activeButton === 'brand' || mapMode === 'search' ? (
    <BrandFilterButton
      variant={isModalOpen ? 'active' : 'inactive'}
      onPress={handleModal}
    />
  ) : (
    mapMode === 'default' && (
      <CurrentLocationSearch onLocationSearch={handleLocationSearch} />
    )
  );
};

export default MapActionButton;

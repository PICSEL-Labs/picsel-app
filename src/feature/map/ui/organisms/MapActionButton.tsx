import React, { Dispatch, SetStateAction, useCallback } from 'react';

import CurrentLocationSearch from './CurrentLocationSearch';

import BrandFilterButton from '@/feature/brand/ui/organisms/BrandFilterButton';

interface Props {
  activeButton: 'brand' | 'location';
  setActiveButton: Dispatch<SetStateAction<'brand' | 'location'>>;
  handleLocationSearch: () => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const MapActionButton = ({
  setActiveButton,
  activeButton,
  handleLocationSearch,
  isModalOpen,
  openModal,
  closeModal,
}: Props) => {
  const handleModal = useCallback(() => {
    if (isModalOpen) {
      closeModal();
    } else {
      openModal();
      setActiveButton('brand');
    }
  }, [isModalOpen, openModal, closeModal, setActiveButton]);

  return (
    <>
      {activeButton === 'brand' && (
        <BrandFilterButton
          variant={isModalOpen ? 'active' : 'inactive'}
          onPress={handleModal}
        />
      )}

      {activeButton === 'location' && (
        <CurrentLocationSearch onLocationSearch={handleLocationSearch} />
      )}
    </>
  );
};

export default MapActionButton;

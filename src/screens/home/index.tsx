import React, { useCallback, useRef, useState } from 'react';

import {
  NaverMapView,
  NaverMapViewRef,
} from '@mj-studio/react-native-naver-map';
import { StyleSheet } from 'react-native';

import BrandFilterBottomSheet from '@/feature/brand/ui/organisms/BrandFilterBottomSheet';
import BrandFilterButton from '@/feature/brand/ui/organisms/BrandFilterButton';
import { useMapCamera } from '@/feature/map/hooks/useMapCamera';
import { useMapSearch } from '@/feature/map/hooks/useMapSearch';
import { useMarker } from '@/feature/map/hooks/useMarker';
import { useFetchStores } from '@/feature/map/queries/useFetchStores';
import CurrentLocationSearch from '@/feature/map/ui/organisms/CurrentLocationSearch';
import MapOverlay from '@/feature/map/ui/organisms/MapOverlay';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { useModal } from '@/shared/hooks/useModal';
import Input from '@/shared/ui/atoms/Input';

const HomeScreen = () => {
  const mapRef = useRef<NaverMapViewRef>(null);

  const [brandName, setBrandName] = useState('');
  const { openModal, closeModal, isModalOpen } = useModal();

  const handleModal = useCallback(() => {
    if (isModalOpen) {
      closeModal();
    } else {
      openModal();
    }
  }, [isModalOpen, openModal, closeModal]);

  const { storeParams, searchStoresByLocation } = useMapSearch();

  const { data: stores } = useFetchStores(storeParams);

  const {
    camera,
    showSearchButton,
    handleCameraChanged,
    hideSearchButton,
    INITIAL_CAMERA,
  } = useMapCamera();

  const { setSelectedMarkerId, selectedMarkerId, handleMarkerPress } =
    useMarker();

  const handleLocationSearch = () => {
    searchStoresByLocation(camera.latitude, camera.longitude, camera.zoom);
    setSelectedMarkerId(null);
    hideSearchButton();
  };

  return (
    <ScreenLayout>
      <NaverMapView
        onCameraIdle={({ latitude, longitude, zoom }) => {
          handleCameraChanged(latitude, longitude, zoom);
        }}
        ref={mapRef}
        onTapMap={() => setSelectedMarkerId(null)}
        style={StyleSheet.absoluteFillObject}
        initialCamera={INITIAL_CAMERA}>
        <MapOverlay
          handleMarkerPress={handleMarkerPress}
          selectedMarkerId={selectedMarkerId}
          stores={stores?.data?.content}
        />
      </NaverMapView>

      <Input
        value={brandName}
        onChangeText={brand => setBrandName(brand)}
        handleClear={() => setBrandName('')}
        placeholder="브랜드명, 매장명, 위치 검색"
        search
        close
        container="pb-[8px]"
      />
      <BrandFilterButton
        variant={isModalOpen ? 'active' : 'inactive'}
        onPress={handleModal}
      />

      <CurrentLocationSearch
        showSearchButton={showSearchButton}
        onLocationSearch={handleLocationSearch}
      />
      <BrandFilterBottomSheet visible={isModalOpen} onClose={closeModal} />
    </ScreenLayout>
  );
};

export default HomeScreen;

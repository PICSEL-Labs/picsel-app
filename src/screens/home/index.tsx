import React, { useRef, useState } from 'react';

import {
  NaverMapView,
  NaverMapViewRef,
} from '@mj-studio/react-native-naver-map';
import { StyleSheet } from 'react-native';

import MapControls from '@/feature/map/components/MapControls';
import MapOverlay from '@/feature/map/components/MapOverlay';
import { useMapCamera } from '@/feature/map/hooks/useMapCamera';
import { useMapSearch } from '@/feature/map/hooks/useMapSearch';
import { useStores } from '@/feature/map/queries/useStores';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

const HomeScreen = () => {
  const mapRef = useRef<NaverMapViewRef>(null);

  // 채린님 구현 코드
  const [brandName, setBrandName] = useState('');
  const [isFilterActive, setIsFilterActive] = useState(false);

  const clearBrandName = () => setBrandName('');
  const toggleFilter = () => setIsFilterActive(prev => !prev);
  // 채린님 구현 코드

  const {
    camera,
    showSearchButton,
    handleCameraChanged,
    hideSearchButton,
    INITIAL_CAMERA,
  } = useMapCamera();

  const { storeParams, searchStoresByLocation } = useMapSearch();

  const { data: stores } = useStores(storeParams);

  const handleLocationSearch = () => {
    searchStoresByLocation(camera.latitude, camera.longitude, camera.zoom);
    hideSearchButton();
  };

  return (
    <ScreenLayout>
      <NaverMapView
        onCameraIdle={({ latitude, longitude, zoom }) => {
          handleCameraChanged(latitude, longitude, zoom);
        }}
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialCamera={INITIAL_CAMERA}>
        <MapOverlay stores={stores?.data?.content} />
      </NaverMapView>

      <MapControls
        brandName={brandName}
        onBrandNameChange={setBrandName}
        onClearBrandName={clearBrandName}
        isFilterActive={isFilterActive}
        onToggleFilter={toggleFilter}
        showSearchButton={showSearchButton}
        onLocationSearch={handleLocationSearch}
      />
    </ScreenLayout>
  );
};

export default HomeScreen;

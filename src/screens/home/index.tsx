import React, { useRef, useState } from 'react';

import {
  NaverMapView,
  NaverMapViewRef,
} from '@mj-studio/react-native-naver-map';
import { StyleSheet } from 'react-native';

import { useMapCamera } from '@/feature/map/hooks/useMapCamera';
import { useMapSearch } from '@/feature/map/hooks/useMapSearch';
import { useMarker } from '@/feature/map/hooks/useMarker';
import { useFetchStores } from '@/feature/map/queries/useFetchStores';
import MapControls from '@/feature/map/ui/organisms/MapControls';
import MapOverlay from '@/feature/map/ui/organisms/MapOverlay';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

const HomeScreen = () => {
  const mapRef = useRef<NaverMapViewRef>(null);

  // 채린님 구현 코드
  const [brandName, setBrandName] = useState('');
  const [isFilterActive, setIsFilterActive] = useState(false);

  const clearBrandName = () => setBrandName('');
  const toggleFilter = () => setIsFilterActive(prev => !prev);
  // 채린님 구현 코드
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

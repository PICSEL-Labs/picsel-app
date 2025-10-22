import React, { useEffect, useRef, useState } from 'react';

import {
  NaverMapView,
  NaverMapViewRef,
} from '@mj-studio/react-native-naver-map';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import BrandFilterBottomSheet from '@/feature/brand/ui/organisms/BrandFilterBottomSheet';
import { useBottomSheetManager } from '@/feature/map/hooks/useBottomSheetManager';
import { useLocationPermission } from '@/feature/map/hooks/useLocationPermission';
import { useMapActions } from '@/feature/map/hooks/useMapActions';
import { useMapCamera } from '@/feature/map/hooks/useMapCamera';
import { useMapEffects } from '@/feature/map/hooks/useMapEffects';
import { useMapSearch } from '@/feature/map/hooks/useMapSearch';
import { useMarker } from '@/feature/map/hooks/useMarker';
import { useFetchStores } from '@/feature/map/queries/useFetchStores';
import BrandDetailBottomSheet from '@/feature/map/ui/organisms/BrandDetailBottomSheet';
import MapActionButton from '@/feature/map/ui/organisms/MapActionButton';
import MapOverlay from '@/feature/map/ui/organisms/MapOverlay';
import NearbyBrandBottomSheet from '@/feature/map/ui/organisms/NearbyBottomSheet';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { useModal } from '@/shared/hooks/useModal';
import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';
import Input from '@/shared/ui/atoms/Input';

const HomeScreen = () => {
  const mapRef = useRef<NaverMapViewRef>(null);
  const navigation = useNavigation<RootStackNavigationProp>();
  const { getCurrentLocation } = useLocationPermission();

  const [brandName, setBrandName] = useState('');
  const [activeButton, setActiveButton] = useState<'brand' | 'location'>(
    'brand',
  );

  const { closeModal, isModalOpen, openModal } = useModal();
  const { storeParams, searchStoresByLocation } = useMapSearch();
  const { data: stores } = useFetchStores(storeParams);
  const { camera, handleMapIdle, hideSearchButton, INITIAL_CAMERA } =
    useMapCamera();
  const { setSelectedMarkerId, selectedMarkerId, handleMarkerPress } =
    useMarker();
  const {
    nearbyBrandVisible,
    detailBrandVisible,
    hideAllSheet,
    hideSheet,
    showSheet,
  } = useBottomSheetManager();

  useMapEffects({
    getCurrentLocation,
    mapRef,
    selectedMarkerId,
    hideSheet,
    showSheet,
  });

  const { handleLocationSearch, handleNavigateSearch } = useMapActions({
    searchStoresByLocation,
    setSelectedMarkerId,
    hideSearchButton,
    setActiveButton,
    showSheet,
    hideAllSheet,
    navigation,
    camera,
  });

  useEffect(() => {
    console.log('Stores data updated:', {
      storeCount: stores?.data?.content?.length,
      brandCount: stores?.data?.brands?.length,
    });
  }, [stores]);

  console.log(stores);

  return (
    <ScreenLayout>
      <NaverMapView
        onCameraIdle={cam =>
          handleMapIdle(cam, isFirst => {
            if (isFirst) {
              return;
            }
            if (!isModalOpen) {
              setActiveButton('location');
            }
          })
        }
        ref={mapRef}
        onTapMap={() => setSelectedMarkerId(null)}
        style={StyleSheet.absoluteFillObject}
        initialCamera={INITIAL_CAMERA}>
        <MapOverlay
          handleMarkerPress={handleMarkerPress}
          selectedMarkerId={selectedMarkerId}
          store={stores?.data.content}
          brand={stores?.data.brands}
        />
      </NaverMapView>

      <Input
        value={brandName}
        onChangeText={setBrandName}
        handleClear={() => setBrandName('')}
        onPress={handleNavigateSearch}
        placeholder="브랜드명, 매장명, 위치 검색"
        search
        close
        container="pb-[8px]"
      />

      <MapActionButton
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        handleLocationSearch={handleLocationSearch}
        isModalOpen={isModalOpen}
        openModal={openModal}
        closeModal={closeModal}
      />

      <BrandFilterBottomSheet visible={isModalOpen} onClose={closeModal} />

      <NearbyBrandBottomSheet
        visible={nearbyBrandVisible}
        brands={stores?.data.brands}
        showSheet={() => showSheet('nearby')}
        hideSheet={() => hideSheet('nearby')}
      />

      <BrandDetailBottomSheet
        visible={detailBrandVisible}
        onClose={() => hideSheet('detail')}
      />
    </ScreenLayout>
  );
};

export default HomeScreen;

import React, { useRef, useState } from 'react';

import {
  NaverMapView,
  NaverMapViewRef,
} from '@mj-studio/react-native-naver-map';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import BrandFilterBottomSheet from '@/feature/brand/ui/organisms/BrandFilterBottomSheet';
import { useMapCamera } from '@/feature/map/hooks/useMapCamera';
import { useMapSearch } from '@/feature/map/hooks/useMapSearch';
import { useMarker } from '@/feature/map/hooks/useMarker';
import { useFetchStores } from '@/feature/map/queries/useFetchStores';
import MapActionButton from '@/feature/map/ui/organisms/MapActionButton';
import MapOverlay from '@/feature/map/ui/organisms/MapOverlay';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { useModal } from '@/shared/hooks/useModal';
import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';
import Input from '@/shared/ui/atoms/Input';

const HomeScreen = () => {
  const mapRef = useRef<NaverMapViewRef>(null);
  const navigation = useNavigation<RootStackNavigationProp>();

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

  const handleLocationSearch = () => {
    searchStoresByLocation(camera.latitude, camera.longitude, camera.zoom);
    setSelectedMarkerId(null);
    hideSearchButton();
    setActiveButton('brand');
  };

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
        onChangeText={brand => setBrandName(brand)}
        handleClear={() => setBrandName('')}
        onPress={() => navigation.navigate('StoreSearch')}
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
    </ScreenLayout>
  );
};

export default HomeScreen;

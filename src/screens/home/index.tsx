import React, { useEffect, useRef, useState } from 'react';

import {
  NaverMapView,
  NaverMapViewRef,
} from '@mj-studio/react-native-naver-map';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet } from 'react-native';
import Config from 'react-native-config';

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
import { useFilteredBrandsStore } from '@/shared/store';
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
  const { selectedMarkerId, selectedStore, handleMarkerPress, clearSelection } =
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
    setSelectedMarkerId: clearSelection,
    hideSearchButton,
    setActiveButton,
    showSheet,
    hideAllSheet,
    navigation,
    camera,
  });

  const { filteredList, filterBrand, resetFilter } = useFilteredBrandsStore();

  useEffect(() => {
    const storeData = stores?.data?.content;
    const brandData = stores?.data?.brands;

    if (storeData?.length && brandData?.length) {
      const brandMap = new Map(
        brandData.map(b => [b.brandId, b.brandIconImageUrl]),
      );

      const imageUrls = storeData
        .map(s => {
          const brandIconUrl = brandMap.get(s.brandId);
          return brandIconUrl ? `${Config.IMAGE_URL}${brandIconUrl}` : null;
        })
        .filter(Boolean);

      // 모든 이미지를 병렬로 프리로드
      Promise.all(
        imageUrls.map(url =>
          Image.prefetch(url!).catch(err => {
            console.warn('Image prefetch failed:', url, err);
          }),
        ),
      ).then(() => {
        console.log('All images prefetched');
      });
    }
  }, [stores?.data?.content, stores?.data?.brands]);

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
        onTapMap={clearSelection}
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

      <BrandFilterBottomSheet
        visible={isModalOpen}
        onClose={closeModal}
        filteredList={filteredList}
        filterBrand={filterBrand}
        resetFilter={resetFilter}
      />

      <NearbyBrandBottomSheet
        visible={nearbyBrandVisible}
        brands={stores?.data.brands}
        showSheet={() => showSheet('nearby')}
        hideSheet={() => hideSheet('nearby')}
      />

      <BrandDetailBottomSheet
        visible={detailBrandVisible}
        storeDetail={selectedStore}
        onClose={() => hideSheet('detail')}
      />
    </ScreenLayout>
  );
};

export default HomeScreen;

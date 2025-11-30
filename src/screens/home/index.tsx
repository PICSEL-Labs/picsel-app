import React from 'react';

import { NaverMapView } from '@mj-studio/react-native-naver-map';
import { StyleSheet } from 'react-native';

import BrandFilterBottomSheet from '@/feature/brand/ui/organisms/BrandFilterBottomSheet';
import { useHomeScreen } from '@/feature/map/hooks/useHomeScreen';
import BrandDetailBottomSheet from '@/feature/map/ui/organisms/BrandDetailBottomSheet';
import MapActionButton from '@/feature/map/ui/organisms/MapActionButton';
import MapOverlay from '@/feature/map/ui/organisms/MapOverlay';
import NearbyBrandBottomSheet from '@/feature/map/ui/organisms/NearbyBottomSheet';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import Input from '@/shared/ui/atoms/Input';

const HomeScreen = () => {
  const {
    mapRef,
    brandName,
    setBrandName,
    activeButton,
    setActiveButton,
    filteredStores,
    filteredBrands,
    isFavorite,
    handleMapIdle,
    selectedMarkerId,
    selectedStore,
    handleMarkerPress,
    clearSelection,
    nearbyBrandVisible,
    detailBrandVisible,
    brandFilterVisible,
    hideSheet,
    showSheet,
    handleLocationSearch,
    handleNavigateSearch,
    userLocation,
  } = useHomeScreen();

  return (
    <ScreenLayout>
      <NaverMapView
        onCameraIdle={cam => {
          handleMapIdle(cam, isFirst => {
            if (isFirst) {
              handleLocationSearch();
              showSheet('nearby');
            }
          });
        }}
        onCameraChanged={reason => {
          if (reason.reason === 'Gesture' || reason.reason === 'Control') {
            setActiveButton('location');
          }
        }}
        ref={mapRef}
        onTapMap={clearSelection}
        style={StyleSheet.absoluteFillObject}
        initialCamera={userLocation ? userLocation : undefined}>
        <MapOverlay
          handleMarkerPress={handleMarkerPress}
          selectedMarkerId={selectedMarkerId}
          store={filteredStores}
          brand={filteredBrands}
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
        brandFilterVisible={brandFilterVisible}
        showFilterSheet={() => showSheet('filter')}
        hideFilterSheet={() => hideSheet('filter')}
        detailHideSheet={() => hideSheet('detail')}
        nearbyHideSheet={() => hideSheet('nearby')}
      />

      <BrandFilterBottomSheet
        visible={brandFilterVisible}
        hideSheet={() => hideSheet('filter')}
        showSheet={() => showSheet('filter')}
      />

      <NearbyBrandBottomSheet
        visible={nearbyBrandVisible}
        brands={filteredBrands}
        showSheet={() => showSheet('nearby')}
        hideSheet={() => hideSheet('nearby')}
      />

      <BrandDetailBottomSheet
        visible={detailBrandVisible}
        storeDetail={selectedStore}
        isFavorite={isFavorite}
        onClose={clearSelection}
      />
    </ScreenLayout>
  );
};

export default HomeScreen;

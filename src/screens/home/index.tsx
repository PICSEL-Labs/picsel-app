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
    isModalOpen,
    openModal,
    closeModal,
    filteredStores,
    filteredBrands,
    isFavorite,
    handleMapIdle,
    INITIAL_CAMERA,
    selectedMarkerId,
    selectedStore,
    handleMarkerPress,
    clearSelection,
    nearbyBrandVisible,
    detailBrandVisible,
    hideSheet,
    showSheet,
    handleLocationSearch,
    handleNavigateSearch,
  } = useHomeScreen();

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
        isModalOpen={isModalOpen}
        openModal={openModal}
        closeModal={closeModal}
        detailHideSheet={() => hideSheet('detail')}
        nearbyHideSheet={() => hideSheet('nearby')}
      />

      <BrandFilterBottomSheet visible={isModalOpen} onClose={closeModal} />

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

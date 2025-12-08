import React, { useEffect } from 'react';

import { NaverMapView } from '@mj-studio/react-native-naver-map';
import { StyleSheet } from 'react-native';

import BrandFilterBottomSheet from '@/feature/brand/ui/organisms/BrandFilterBottomSheet';
import { useHomeScreen } from '@/feature/map/hooks/useHomeScreen';
import BrandDetailBottomSheet from '@/feature/map/ui/organisms/BrandDetailBottomSheet';
import MapActionButton from '@/feature/map/ui/organisms/MapActionButton';
import MapOverlay from '@/feature/map/ui/organisms/MapOverlay';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { useMapLocationStore } from '@/shared/store';
import Input from '@/shared/ui/atoms/Input';

const HomeScreen = () => {
  const {
    targetLocation,
    selectedStoreId,
    isNavigatingToSearchResult,
    clearTarget,
  } = useMapLocationStore();

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
    selectedMarkerId,
    selectedStore,
    handleMarkerPress,
    clearSelection,
    detailBrandVisible,
    hideSheet,
    handleLocationSearch,
    handleNavigateSearch,
    userLocation,
  } = useHomeScreen();

  useEffect(() => {
    if (targetLocation && isNavigatingToSearchResult && mapRef.current) {
      console.log('📍 검색 위치로 이동:', targetLocation);

      mapRef.current.animateCameraTo({
        latitude: targetLocation.latitude,
        longitude: targetLocation.longitude,
        zoom: targetLocation.zoom,
        duration: 500,
      });

      setTimeout(() => {
        if (selectedStoreId && filteredStores) {
          const targetStore = filteredStores.find(
            store => store.storeId === selectedStoreId,
          );

          if (targetStore) {
            const brandInfo = filteredBrands?.find(
              brand => brand.brandId === targetStore.brandId,
            );

            handleMarkerPress({
              storeId: targetStore.storeId,
              storeName: targetStore.storeName,
              brandId: targetStore.brandId,
              brandName: brandInfo?.brandName,
              address: targetStore.address,
              distance: targetStore.distance,
              brandIconImageUrl: brandInfo?.brandIconImageUrl,
            });
          }
        }

        clearTarget();
      }, 600);
    }
  }, [
    targetLocation,
    isNavigatingToSearchResult,
    selectedStoreId,
    filteredStores,
    filteredBrands,
  ]);

  return (
    <ScreenLayout>
      <NaverMapView
        onCameraIdle={cam => {
          handleMapIdle(cam, isFirst => {
            if (isFirst) {
              handleLocationSearch();
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
        editable={false}
        container="pb-[8px]"
      />

      <MapActionButton
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        handleLocationSearch={handleLocationSearch}
        isModalOpen={isModalOpen}
        openModal={openModal}
        closeModal={closeModal}
        detailHideSheet={() => hideSheet()}
      />

      <BrandFilterBottomSheet visible={isModalOpen} onClose={closeModal} />

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

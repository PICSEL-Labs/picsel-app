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
  const { targetLocation, selectedStoreId, clearTarget } =
    useMapLocationStore();

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
    // nearbyBrandVisible,
    detailBrandVisible,
    hideSheet,
    showSheet,
    handleLocationSearch,
    handleNavigateSearch,
    userLocation,
  } = useHomeScreen();

  useEffect(() => {
    if (targetLocation) {
      // 매장 검색인 경우 마커 선택
      if (selectedStoreId && filteredStores) {
        // 검색 완료 후 해당 매장 찾아서 마커 선택

        const targetStore = filteredStores.find(
          store => store.storeId === selectedStoreId,
        );

        if (targetStore) {
          // 브랜드 정보 찾기
          const brandInfo = filteredBrands?.find(
            brand => brand.brandId === targetStore.brandId,
          );

          // handleMarkerPress 호출
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
    }
  }, [
    targetLocation,
    selectedStoreId,
    filteredStores,
    filteredBrands,
    clearTarget,
    handleMarkerPress,
    showSheet,
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

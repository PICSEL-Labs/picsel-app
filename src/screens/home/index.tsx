import React, { useEffect } from 'react';

import { NaverMapView } from '@mj-studio/react-native-naver-map';
import { StyleSheet } from 'react-native';

import BrandFilterBottomSheet from '@/feature/brand/ui/organisms/BrandFilterBottomSheet';
import { useHomeScreen } from '@/feature/map/hooks/useHomeScreen';
import BrandDetailBottomSheet from '@/feature/map/ui/organisms/BrandDetailBottomSheet';
import EmptyBottomSheet from '@/feature/map/ui/organisms/EmptyBottomSheet';
import MapActionButton from '@/feature/map/ui/organisms/MapActionButton';
import MapOverlay from '@/feature/map/ui/organisms/MapOverlay';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { useMapLocationStore } from '@/shared/store';
import Input from '@/shared/ui/atoms/Input';

const HomeScreen = () => {
  const {
    targetLocation,
    selectedStoreId,
    mapMode,
    resetToDefault,
    searchedStore,
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
    emptyBrandVisible,
    selectedStore,
    handleMarkerPress,
    clearSelection,
    detailBrandVisible,
    hideSheet,
    handleLocationSearch,
    handleNavigateSearch,
    userLocation,
    navigation,
  } = useHomeScreen();

  // 검색 모드 해제 핸들러
  const handleResetToDefault = () => {
    resetToDefault();
    setBrandName('');
    clearSelection();
    resetToDefault();
  };

  useEffect(() => {
    if (targetLocation && mapRef.current) {
      mapRef.current.animateCameraTo({
        latitude: targetLocation.latitude,
        longitude: targetLocation.longitude,
        zoom: targetLocation.zoom,
        duration: 200,
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
      });
    }
  }, [targetLocation, selectedStoreId, filteredStores, filteredBrands]);

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
        value={mapMode === 'search' ? searchedStore?.title : brandName}
        onChangeText={setBrandName}
        handleClear={handleResetToDefault}
        onPress={handleNavigateSearch}
        onPressLeft={() => navigation.goBack()}
        placeholder="브랜드명, 매장명, 위치 검색"
        close
        arrow={mapMode === 'search'}
        search={mapMode === 'default'}
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
        detailHideSheet={() => hideSheet('detail')}
        nearbyHideSheet={() => hideSheet('empty')}
      />

      <BrandFilterBottomSheet visible={isModalOpen} onClose={closeModal} />

      <BrandDetailBottomSheet
        visible={detailBrandVisible}
        storeDetail={selectedStore}
        isFavorite={isFavorite}
        onClose={clearSelection}
      />

      {filteredBrands?.length === 0 && (
        <EmptyBottomSheet
          visible={emptyBrandVisible}
          brands={filteredBrands}
          hideSheet={() => hideSheet('empty')}
        />
      )}
    </ScreenLayout>
  );
};

export default HomeScreen;

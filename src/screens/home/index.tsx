import React, { useEffect, useRef } from 'react';

import { NaverMapView } from '@mj-studio/react-native-naver-map';
import { StyleSheet } from 'react-native';

import { useBrandTooltipOnce } from '@/feature/brand/model/hooks/useBrandTooltipOnce';
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
  const hasAutoSelectedRef = useRef(false);
  const lastSelectedStoreIdRef = useRef<string | null>(null);
  const hasCameraMovedForCurrentSearchRef = useRef(false);

  const { showBrandTooltip, fadeAnim } = useBrandTooltipOnce();

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
    brandFilterVisible,
    hideSheet,
    handleLocationSearch,
    handleNavigateSearch,
    userLocation,
    showSheet,
    navigation,
  } = useHomeScreen();

  const handleResetToDefault = () => {
    clearSelection();
    resetToDefault();
  };

  useEffect(() => {
    if (
      targetLocation &&
      mapRef.current &&
      !hasCameraMovedForCurrentSearchRef.current
    ) {
      mapRef.current.animateCameraTo({
        latitude: targetLocation.latitude,
        longitude: targetLocation.longitude,
        zoom: targetLocation.zoom,
        duration: 300,
      });

      hasCameraMovedForCurrentSearchRef.current = true;

      const timeoutId = setTimeout(() => {
        if (
          selectedStoreId &&
          filteredStores &&
          filteredBrands &&
          selectedMarkerId !== selectedStoreId &&
          !hasAutoSelectedRef.current &&
          lastSelectedStoreIdRef.current !== selectedStoreId
        ) {
          const targetStore = filteredStores.find(
            store => store.storeId === selectedStoreId,
          );

          if (targetStore) {
            const brandInfo = filteredBrands.find(
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

            hasAutoSelectedRef.current = true;
            lastSelectedStoreIdRef.current = selectedStoreId;
          }
        }
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [
    targetLocation,
    selectedStoreId,
    selectedMarkerId,
    filteredStores,
    filteredBrands,
    handleMarkerPress,
  ]);

  useEffect(() => {
    if (mapMode === 'default') {
      hasAutoSelectedRef.current = false;
      lastSelectedStoreIdRef.current = null;
      hasCameraMovedForCurrentSearchRef.current = false;
    }
  }, [mapMode]);

  useEffect(() => {
    hasCameraMovedForCurrentSearchRef.current = false;
  }, [targetLocation]);

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
        brandFilterVisible={brandFilterVisible}
        showFilterSheet={() => showSheet('filter')}
        hideFilterSheet={() => hideSheet('filter')}
        detailHideSheet={() => hideSheet('detail')}
        emptyHideSheet={() => hideSheet('empty')}
        showBrandTooltip={showBrandTooltip}
        fadeAnim={fadeAnim}
      />

      <BrandFilterBottomSheet
        visible={brandFilterVisible}
        hideSheet={() => hideSheet('filter')}
        showSheet={() => showSheet('filter')}
      />

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

import React, { useCallback, useEffect, useRef } from 'react';

import { NaverMapView } from '@mj-studio/react-native-naver-map';
import { StyleSheet } from 'react-native';

import { useBrandTooltipOnce } from '@/feature/brand/model/hooks/useBrandTooltipOnce';
import { useHomeScreen } from '@/feature/map/hooks/useHomeScreen';
import BrandDetailBottomSheet from '@/feature/map/ui/organisms/BrandDetailBottomSheet';
import BrandFilterBottomSheet from '@/feature/map/ui/organisms/BrandFilterBottomSheet';
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
  const hasSearchedForCurrentLocationRef = useRef(false);

  const { showBrandTooltip, fadeAnim } = useBrandTooltipOnce();

  const {
    targetLocation,
    selectedStoreId,
    mapMode,
    resetToDefault,
    searchedStore,
    setKeepSearchedMarker,
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
    searchStoresByLocation,
  } = useHomeScreen();

  const handleResetToDefault = () => {
    clearSelection();
    resetToDefault();
  };

  const handleBottomSheetClose = useCallback(() => {
    if (mapMode === 'search' && searchedStore?.kind === 'store') {
      setKeepSearchedMarker(true);
      clearSelection(true);
    } else {
      clearSelection(false);
    }
  }, [mapMode, searchedStore, setKeepSearchedMarker, clearSelection]);

  const handleMapTap = useCallback(() => {
    if (mapMode === 'search' && searchedStore?.kind === 'store') {
      setKeepSearchedMarker(true);
      clearSelection(true);
    } else {
      clearSelection(false);
    }
  }, [mapMode, searchedStore, setKeepSearchedMarker, clearSelection]);

  useEffect(() => {
    if (
      targetLocation &&
      mapRef.current &&
      !hasCameraMovedForCurrentSearchRef.current
    ) {
      hasSearchedForCurrentLocationRef.current = false;
      hasAutoSelectedRef.current = false;
      lastSelectedStoreIdRef.current = null;

      mapRef.current.animateCameraTo({
        latitude: targetLocation.latitude,
        longitude: targetLocation.longitude,
        zoom: targetLocation.zoom,
        duration: 300,
      });

      hasCameraMovedForCurrentSearchRef.current = true;
    }
  }, [targetLocation]);

  useEffect(() => {
    if (
      mapMode === 'search' &&
      searchedStore?.kind === 'store' &&
      selectedStoreId &&
      filteredStores &&
      filteredBrands &&
      selectedMarkerId !== selectedStoreId &&
      !hasAutoSelectedRef.current &&
      lastSelectedStoreIdRef.current !== selectedStoreId &&
      hasCameraMovedForCurrentSearchRef.current
    ) {
      const targetStore = filteredStores.find(
        store => store.storeId === selectedStoreId,
      );

      if (targetStore) {
        const brandInfo = filteredBrands.find(
          brand => brand.brandId === targetStore.brandId,
        );

        handleMarkerPress(
          {
            storeId: targetStore.storeId,
            storeName: targetStore.storeName,
            brandId: targetStore.brandId,
            brandName: brandInfo?.brandName,
            address: targetStore.address,
            distance: targetStore.distance,
            brandIconImageUrl: brandInfo?.brandIconImageUrl,
          },
          true,
        );

        hasAutoSelectedRef.current = true;
        lastSelectedStoreIdRef.current = selectedStoreId;
      }
    }
  }, [
    mapMode,
    searchedStore,
    selectedStoreId,
    filteredStores,
    filteredBrands,
    selectedMarkerId,
    handleMarkerPress,
  ]);

  useEffect(() => {
    if (mapMode === 'default') {
      hasAutoSelectedRef.current = false;
      lastSelectedStoreIdRef.current = null;
      hasCameraMovedForCurrentSearchRef.current = false;
      hasSearchedForCurrentLocationRef.current = false;
    }
  }, [mapMode]);

  return (
    <ScreenLayout>
      <NaverMapView
        onCameraIdle={cam => {
          handleMapIdle(cam, isFirst => {
            if (isFirst) {
              handleLocationSearch();
            }
          });

          if (
            mapMode === 'search' &&
            searchedStore &&
            targetLocation &&
            hasCameraMovedForCurrentSearchRef.current &&
            !hasSearchedForCurrentLocationRef.current
          ) {
            hasSearchedForCurrentLocationRef.current = true;

            searchStoresByLocation(
              targetLocation.latitude,
              targetLocation.longitude,
              targetLocation.zoom,
            );

            if (searchedStore.kind !== 'store') {
              setTimeout(() => {
                if (filteredStores?.length === 0) {
                  showSheet('empty');
                }
              }, 500);
            }
          }
        }}
        onCameraChanged={reason => {
          if (reason.reason === 'Gesture' || reason.reason === 'Control') {
            setActiveButton('location');
          }
        }}
        ref={mapRef}
        onTapMap={handleMapTap}
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
        onClose={handleBottomSheetClose}
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

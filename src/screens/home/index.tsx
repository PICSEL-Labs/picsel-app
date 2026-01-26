import React, { useCallback } from 'react';

import {
  Camera,
  NaverMapView,
  Region,
} from '@mj-studio/react-native-naver-map';
import { StyleSheet } from 'react-native';

import { useBrandTooltipOnce } from '@/feature/brand/model/hooks/useBrandTooltipOnce';
import { useHomeScreen } from '@/feature/map/hooks/useHomeScreen';
import { useSearchMode } from '@/feature/map/hooks/useSearchMode';
import BrandDetailBottomSheet from '@/feature/map/ui/organisms/BrandDetailBottomSheet';
import EmptyBottomSheet from '@/feature/map/ui/organisms/EmptyBottomSheet';
import MapActionButton from '@/feature/map/ui/organisms/MapActionButton';
import MapOverlay from '@/feature/map/ui/organisms/MapOverlay';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { useMapLocationStore } from '@/shared/store';
import Input from '@/shared/ui/atoms/Input';

const HomeScreen = () => {
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
    hideSheet,
    handleLocationSearch,
    handleNavigateSearch,
    userLocation,
    showSheet,
    searchStoresByLocation,
  } = useHomeScreen();

  const {
    hasCameraMovedForCurrentSearchRef,
    hasSearchedForCurrentLocationRef,
    handleBottomSheetClose,
    handleMapTap,
  } = useSearchMode({
    targetLocation,
    mapMode,
    searchedStore,
    selectedStoreId,
    filteredStores,
    filteredBrands,
    selectedMarkerId,
    detailBrandVisible,
    handleMarkerPress,
    clearSelection,
    setKeepSearchedMarker,
    hideSheet,
    mapRef,
  });

  const handleResetToDefault = () => {
    clearSelection();
    resetToDefault();
    hideSheet('detail');
    hideSheet('empty');
    hideSheet('filter');
  };

  const handleCameraIdle = useCallback(
    (cam: Camera & { region: Region }) => {
      handleMapIdle(cam, isFirst => {
        if (isFirst) {
          handleLocationSearch();
        }
      });

      // 검색 모드에서 카메라 이동 후 주변 매장 검색
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
    },
    [
      handleMapIdle,
      handleLocationSearch,
      mapMode,
      searchedStore,
      targetLocation,
      searchStoresByLocation,
      filteredStores,
      showSheet,
    ],
  );

  return (
    <ScreenLayout>
      <NaverMapView
        onCameraIdle={handleCameraIdle}
        onCameraChanged={reason => {
          if (reason.reason === 'Gesture' || reason.reason === 'Control') {
            setActiveButton('location');
          }
        }}
        ref={mapRef}
        onTapMap={handleMapTap}
        style={StyleSheet.absoluteFillObject}
        initialCamera={userLocation ? userLocation : undefined}
        maxZoom={19}>
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
        onPressLeft={handleResetToDefault}
        placeholder="브랜드명, 매장명, 위치 검색"
        close
        arrow={mapMode === 'search'}
        search={mapMode === 'default'}
        editable={false}
        container="pb-[8px]"
        className="w-80"
      />

      <MapActionButton
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        handleLocationSearch={handleLocationSearch}
        showFilterSheet={() => showSheet('filter')}
        hideFilterSheet={() => hideSheet('filter')}
        detailHideSheet={() => hideSheet('detail')}
        emptyHideSheet={() => hideSheet('empty')}
        showBrandTooltip={showBrandTooltip}
        fadeAnim={fadeAnim}
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

import React, { useCallback, useEffect } from 'react';

import {
  Camera,
  NaverMapView,
  Region,
} from '@mj-studio/react-native-naver-map';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useBrandTooltipOnce } from '@/feature/brand/model/hooks/useBrandTooltipOnce';
import { useHomeScreen } from '@/feature/map/hooks/useHomeScreen';
import { useSearchMode } from '@/feature/map/hooks/useSearchMode';
import BrandDetailBottomSheet from '@/feature/map/ui/organisms/BrandDetailBottomSheet';
import EmptyBottomSheet from '@/feature/map/ui/organisms/EmptyBottomSheet';
import MapActionButton from '@/feature/map/ui/organisms/MapActionButton';
import MapOverlay from '@/feature/map/ui/organisms/MapOverlay';
import { usePrefetchMyPage } from '@/feature/mypage/main/hooks/usePrefetchMyPage';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { HEIGHT } from '@/shared/constants/size';
import { useRequestNotificationPermission } from '@/shared/hooks/useRequestNotificationPermission';
import LocateIcons from '@/shared/icons/LocateIcons';
import { useMapLocationStore } from '@/shared/store';
import { floatingButtonShadow } from '@/shared/styles/shadows';
import Input from '@/shared/ui/atoms/Input';

const GPS_BOTTOM_DEFAULT = 90;
const GPS_SHEET_GAP = -30;

const HomeScreen = () => {
  useRequestNotificationPermission();
  usePrefetchMyPage();
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
    handleGpsPress,
    isGpsActive,
    handleCameraChanged,
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

  const insets = useSafeAreaInsets();
  const sheetAnimatedPosition = useSharedValue(HEIGHT);
  const insetsBottom = useSharedValue(insets.bottom);

  useEffect(() => {
    insetsBottom.value = insets.bottom;
  }, [insets.bottom]);

  const gpsBottom = useDerivedValue(() => {
    const sheetTopFromBottom = HEIGHT - sheetAnimatedPosition.value;
    const bottomInSafeArea =
      sheetTopFromBottom + GPS_SHEET_GAP - insetsBottom.value;

    return Math.max(GPS_BOTTOM_DEFAULT, bottomInSafeArea);
  });

  const gpsButtonStyle = useAnimatedStyle(() => ({
    bottom: gpsBottom.value,
  }));

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
        onCameraChanged={reason => handleCameraChanged(reason.reason)}
        ref={mapRef}
        onTapMap={handleMapTap}
        style={StyleSheet.absoluteFillObject}
        initialCamera={userLocation ?? undefined}
        isShowLocationButton={false}
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

      <Animated.View className="absolute left-[12px]" style={gpsButtonStyle}>
        <Pressable
          className="h-[40px] w-[40px] items-center justify-center rounded-full bg-neutral-white"
          onPress={handleGpsPress}
          style={floatingButtonShadow}>
          <LocateIcons
            shape={isGpsActive ? 'skyblue' : 'gray'}
            width={24}
            height={24}
          />
        </Pressable>
      </Animated.View>

      <BrandDetailBottomSheet
        visible={detailBrandVisible}
        storeDetail={selectedStore}
        isFavorite={isFavorite}
        onClose={handleBottomSheetClose}
        animatedPosition={sheetAnimatedPosition}
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

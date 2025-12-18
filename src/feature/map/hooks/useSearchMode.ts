import { RefObject, useCallback, useEffect, useRef } from 'react';

import { NaverMapViewRef } from '@mj-studio/react-native-naver-map';

import { BrandData, StoreData, StoreDetail } from '../types';

interface Props {
  targetLocation: { latitude: number; longitude: number; zoom: number } | null;
  mapMode: 'default' | 'search';
  searchedStore: {
    id: string;
    kind: string;
    title: string;
    subtitle: string;
  } | null;
  selectedStoreId: string | null;
  filteredStores: StoreData[] | undefined;
  filteredBrands: BrandData[] | undefined;
  selectedMarkerId: string | null;
  handleMarkerPress: (store: StoreDetail, isFromSearch?: boolean) => void;
  clearSelection: (keepSearched?: boolean) => void;
  setKeepSearchedMarker: (keep: boolean) => void;
  mapRef: RefObject<NaverMapViewRef>;
}

/**
 * 검색 모드 관련 로직을 관리하는 커스텀 훅
 *
 * 역할:
 * 1. 검색 시 카메라 이동
 * 2. 매장 검색 시 자동 선택
 * 3. 검색 상태 ref 관리
 * 4. 바텀시트/맵 탭 핸들러 제공
 */
export const useSearchMode = ({
  targetLocation,
  mapMode,
  searchedStore,
  selectedStoreId,
  filteredStores,
  filteredBrands,
  selectedMarkerId,
  handleMarkerPress,
  clearSelection,
  setKeepSearchedMarker,
  mapRef,
}: Props) => {
  // 검색 상태 관리 refs
  const hasAutoSelectedRef = useRef(false);
  const lastSelectedStoreIdRef = useRef<string | null>(null);
  const hasCameraMovedForCurrentSearchRef = useRef(false);
  const hasSearchedForCurrentLocationRef = useRef(false);

  // 카메라 이동
  useEffect(() => {
    if (
      targetLocation &&
      mapRef.current &&
      !hasCameraMovedForCurrentSearchRef.current
    ) {
      // 새로운 검색이므로 모든 ref 리셋
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
  }, [targetLocation, mapRef]);

  // 매장 자동 선택 (filteredStores 업데이트 시)
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

  // 기본 모드로 전환 시 ref 리셋
  useEffect(() => {
    if (mapMode === 'default') {
      hasAutoSelectedRef.current = false;
      lastSelectedStoreIdRef.current = null;
      hasCameraMovedForCurrentSearchRef.current = false;
      hasSearchedForCurrentLocationRef.current = false;
    }
  }, [mapMode]);

  // 바텀시트 닫기 핸들러
  const handleBottomSheetClose = useCallback(() => {
    if (mapMode === 'search' && searchedStore?.kind === 'store') {
      setKeepSearchedMarker(true);
      clearSelection(true);
    } else {
      clearSelection(false);
    }
  }, [mapMode, searchedStore, setKeepSearchedMarker, clearSelection]);

  // 맵 탭 핸들러
  const handleMapTap = useCallback(() => {
    if (mapMode === 'search' && searchedStore?.kind === 'store') {
      setKeepSearchedMarker(true);
      clearSelection(true);
    } else {
      clearSelection(false);
    }
  }, [mapMode, searchedStore, setKeepSearchedMarker, clearSelection]);

  return {
    // Refs (카메라 idle 핸들러에서 사용)
    hasCameraMovedForCurrentSearchRef,
    hasSearchedForCurrentLocationRef,

    // Handlers
    handleBottomSheetClose,
    handleMapTap,
  };
};

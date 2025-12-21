import { useCallback, useEffect, useRef } from 'react';

import { NaverMapViewRef } from '@mj-studio/react-native-naver-map';

import { StoreDetail } from '../types';
import { BrandData, StoreData } from '../types';

interface UseSearchModeParams {
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
  detailBrandVisible: boolean;
  handleMarkerPress: (store: StoreDetail, isFromSearch?: boolean) => void;
  clearSelection: (keepSearched?: boolean) => void;
  setKeepSearchedMarker: (keep: boolean) => void;
  hideSheet: (type: 'empty' | 'detail' | 'filter') => void;
  mapRef: React.RefObject<NaverMapViewRef>;
}

export const useSearchMode = ({
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
  mapRef,
}: UseSearchModeParams) => {
  const hasAutoSelectedRef = useRef(false);
  const lastSelectedStoreIdRef = useRef<string | null>(null);
  const hasCameraMovedForCurrentSearchRef = useRef(false);
  const hasSearchedForCurrentLocationRef = useRef(false);
  const autoSelectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const processingAutoSelectRef = useRef(false);
  const bottomSheetOpenTimeRef = useRef(0);
  const lastTargetLocationRef = useRef<typeof targetLocation>(null);

  // 카메라 이동
  useEffect(() => {
    // 새로운 검색인지 확인 (targetLocation이 변경되었는지)
    const isNewSearch =
      !lastTargetLocationRef.current ||
      lastTargetLocationRef.current.latitude !== targetLocation?.latitude ||
      lastTargetLocationRef.current.longitude !== targetLocation?.longitude;

    if (targetLocation && mapRef.current && isNewSearch) {
      // 새로운 검색이므로 모든 ref 리셋
      hasSearchedForCurrentLocationRef.current = false;
      hasAutoSelectedRef.current = false;
      lastSelectedStoreIdRef.current = null;
      hasCameraMovedForCurrentSearchRef.current = false;

      mapRef.current.animateCameraTo({
        latitude: targetLocation.latitude,
        longitude: targetLocation.longitude,
        zoom: targetLocation.zoom,
        duration: 300,
      });

      hasCameraMovedForCurrentSearchRef.current = true;
      lastTargetLocationRef.current = targetLocation;
    }
  }, [targetLocation, mapRef]);

  useEffect(() => {
    if (processingAutoSelectRef.current) {
      return;
    }

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
        // 처리 시작 플래그 설정
        processingAutoSelectRef.current = true;

        if (autoSelectTimeoutRef.current) {
          clearTimeout(autoSelectTimeoutRef.current);
        }

        // 200ms debounce로 중복 실행 방지
        autoSelectTimeoutRef.current = setTimeout(() => {
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

          // 처리 완료 후 플래그 해제
          setTimeout(() => {
            processingAutoSelectRef.current = false;
          }, 300);
        }, 200);
      }
    }

    return () => {
      if (autoSelectTimeoutRef.current) {
        clearTimeout(autoSelectTimeoutRef.current);
      }
    };
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
      // 진행 중인 timeout 취소
      if (autoSelectTimeoutRef.current) {
        clearTimeout(autoSelectTimeoutRef.current);
        autoSelectTimeoutRef.current = null;
      }

      hasAutoSelectedRef.current = false;
      lastSelectedStoreIdRef.current = null;
      hasCameraMovedForCurrentSearchRef.current = false;
      hasSearchedForCurrentLocationRef.current = false;
      processingAutoSelectRef.current = false;
      bottomSheetOpenTimeRef.current = 0;
    }
  }, [mapMode]);

  // 바텀시트 열림 시간 추적
  useEffect(() => {
    if (detailBrandVisible) {
      bottomSheetOpenTimeRef.current = Date.now();
    } else {
      bottomSheetOpenTimeRef.current = 0;
    }
  }, [detailBrandVisible]);

  // 공통 선택 해제 로직
  const handleClearSelection = useCallback(() => {
    if (mapMode === 'search' && searchedStore?.kind === 'store') {
      setKeepSearchedMarker(true);
      clearSelection(true);
    } else {
      clearSelection(false);
    }
  }, [mapMode, searchedStore, setKeepSearchedMarker, clearSelection]);

  // 바텀시트 닫기 핸들러
  const handleBottomSheetClose = useCallback(() => {
    handleClearSelection();
  }, [handleClearSelection]);

  // 맵 탭 핸들러 (바텀시트가 완전히 열린 후에만 동작)
  const handleMapTap = useCallback(() => {
    const now = Date.now();

    // 바텀시트가 열려있지 않으면 아무것도 하지 않음
    if (!detailBrandVisible) {
      return;
    }

    // 바텀시트가 열린 지 500ms 미만이면 무시 (안정화 대기)
    if (now - bottomSheetOpenTimeRef.current < 500) {
      return;
    }

    handleClearSelection();
  }, [detailBrandVisible, handleClearSelection]);

  return {
    // Refs
    hasCameraMovedForCurrentSearchRef,
    hasSearchedForCurrentLocationRef,

    // Handlers
    handleBottomSheetClose,
    handleMapTap,
  };
};

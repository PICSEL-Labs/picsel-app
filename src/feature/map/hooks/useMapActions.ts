import { useCallback } from 'react';

import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { useFilteredBrandsStore, useMapLocationStore } from '@/shared/store';

interface UseMapActionsParams {
  searchStoresByLocation: (lat: number, lng: number, zoom?: number) => void;
  setSelectedMarkerId: (id: string | null) => void;
  hideSearchButton: () => void;
  setActiveButton: (button: 'brand' | 'location') => void;
  showSheet: (type: 'empty' | 'detail') => void;
  hideAllSheet: () => void;
  navigation: RootStackNavigationProp;
  camera: { latitude: number; longitude: number; zoom: number };
}

export const useMapActions = ({
  searchStoresByLocation,
  setSelectedMarkerId,
  hideSearchButton,
  setActiveButton,
  showSheet,
  hideAllSheet,
  navigation,
  camera,
}: UseMapActionsParams) => {
  const { clearAppliedFilter } = useFilteredBrandsStore();
  const { mapMode } = useMapLocationStore();

  const resetSearchUI = useCallback(() => {
    setSelectedMarkerId(null);
    hideSearchButton();
    setActiveButton('brand');
    showSheet('empty');
  }, [setSelectedMarkerId, hideSearchButton, setActiveButton, showSheet]);

  const handleLocationSearch = useCallback(() => {
    clearAppliedFilter('map');
    searchStoresByLocation(camera.latitude, camera.longitude, camera.zoom);
    resetSearchUI();
  }, [searchStoresByLocation, camera, clearAppliedFilter, resetSearchUI]);

  const handleNavigateSearch = useCallback(() => {
    mapMode === 'search'
      ? navigation.goBack()
      : navigation.navigate('StoreSearch');
    hideAllSheet();
  }, [navigation, hideAllSheet, mapMode]);

  return {
    handleLocationSearch,
    handleNavigateSearch,
  };
};

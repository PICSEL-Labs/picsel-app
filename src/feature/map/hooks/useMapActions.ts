import { useCallback } from 'react';

import { useFilteredBrandsStore, useMapLocationStore } from '@/shared/store';
import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';

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
  const { mapMode, resetToDefault } = useMapLocationStore();

  const handleLocationSearch = useCallback(() => {
    clearAppliedFilter();
    searchStoresByLocation(camera.latitude, camera.longitude, camera.zoom);
    setSelectedMarkerId(null);
    hideSearchButton();
    setActiveButton('brand');
    showSheet('empty');
  }, [
    searchStoresByLocation,
    camera,
    setSelectedMarkerId,
    hideSearchButton,
    setActiveButton,
    showSheet,
  ]);

  const handleNavigateSearch = () => {
    mapMode === 'search'
      ? navigation.goBack()
      : navigation.navigate('StoreSearch');
    hideAllSheet();
  };

  const handleSearchModeBack = () => {
    resetToDefault();
    navigation.goBack();
  };

  return {
    handleLocationSearch,
    handleNavigateSearch,
    handleSearchModeBack,
  };
};

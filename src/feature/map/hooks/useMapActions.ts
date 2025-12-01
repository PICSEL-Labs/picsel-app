import { useCallback } from 'react';

import { useFilteredBrandsStore } from '@/shared/store';
import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';

interface UseMapActionsParams {
  searchStoresByLocation: (lat: number, lng: number, zoom?: number) => void;
  setSelectedMarkerId: (id: string | null) => void;
  hideSearchButton: () => void;
  setActiveButton: (button: 'brand' | 'location') => void;
  showSheet: () => void;
  hideSheet: () => void;
  navigation: RootStackNavigationProp;
  camera: { latitude: number; longitude: number; zoom: number };
}

export const useMapActions = ({
  searchStoresByLocation,
  setSelectedMarkerId,
  hideSearchButton,
  setActiveButton,
  showSheet,
  hideSheet,
  navigation,
  camera,
}: UseMapActionsParams) => {
  const { clearAppliedFilter } = useFilteredBrandsStore();

  const handleLocationSearch = useCallback(() => {
    clearAppliedFilter();
    searchStoresByLocation(camera.latitude, camera.longitude, camera.zoom);
    setSelectedMarkerId(null);
    hideSearchButton();
    setActiveButton('brand');
  }, [
    searchStoresByLocation,
    camera,
    setSelectedMarkerId,
    hideSearchButton,
    setActiveButton,
    showSheet,
  ]);

  const handleNavigateSearch = useCallback(() => {
    navigation.navigate('StoreSearch');
    hideSheet();
  }, [navigation, hideSheet]);

  return {
    handleLocationSearch,
    handleNavigateSearch,
  };
};

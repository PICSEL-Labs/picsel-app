import { useEffect, useRef, useState } from 'react';

import { NaverMapViewRef } from '@mj-studio/react-native-naver-map';
import { useNavigation } from '@react-navigation/native';

import { useBottomSheetManager } from '../hooks/useBottomSheetManager';
import { useMapActions } from '../hooks/useMapActions';
import { useMapCamera } from '../hooks/useMapCamera';
import { useMapEffects } from '../hooks/useMapEffects';
import { useMapSearch } from '../hooks/useMapSearch';
import { useMarker } from '../hooks/useMarker';
import { useFetchStores } from '../queries/useFetchStores';

import { useFilteredData } from './useFilteredData';
import { useStoreFavorite } from './useStoreFavorite';

import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { useModal } from '@/shared/hooks/useModal';
import { useFavoriteStore } from '@/shared/store';

export const useHomeScreen = () => {
  const mapRef = useRef<NaverMapViewRef>(null);
  const navigation = useNavigation<RootStackNavigationProp>();

  const [brandName, setBrandName] = useState('');
  const [activeButton, setActiveButton] = useState<'brand' | 'location'>(
    'brand',
  );

  const { closeModal, isModalOpen, openModal } = useModal();
  const { storeParams, searchStoresByLocation } = useMapSearch();
  const { data: stores } = useFetchStores(storeParams);
  const { camera, handleMapIdle, hideSearchButton, userLocation } =
    useMapCamera();
  const {
    selectedMarkerId,
    selectedStore,
    handleMarkerPress,
    clearSelection,
    setSelectedMarkerId,
  } = useMarker();
  const {
    emptyBrandVisible,
    detailBrandVisible,
    hideAllSheet,
    hideSheet,
    showSheet,
  } = useBottomSheetManager();

  useMapEffects({
    selectedMarkerId,
    hideSheet,
    showSheet,
  });

  const { handleLocationSearch, handleNavigateSearch } = useMapActions({
    searchStoresByLocation,
    setSelectedMarkerId,
    hideSearchButton,
    setActiveButton,
    showSheet,
    hideAllSheet,
    navigation,
    camera,
  });

  const { filteredStores, filteredBrands } = useFilteredData({
    stores: stores?.data?.content,
    brands: stores?.data?.brands,
  });

  const isFavorite = useStoreFavorite(stores?.data?.brands, selectedStore);

  const { syncFavorites } = useFavoriteStore();

  useEffect(() => {
    const brands = stores?.data?.brands;
    if (brands && brands.length > 0) {
      const favoritesMap = brands.reduce<Record<string, boolean>>(
        (acc, b) => ({ ...acc, [b.brandId]: b.isFavorite }),
        {},
      );
      syncFavorites(favoritesMap);
    }
  }, [stores?.data?.brands, syncFavorites]);

  return {
    // Refs
    mapRef,

    // State
    brandName,
    setBrandName,
    activeButton,
    setActiveButton,

    // Modal
    isModalOpen,
    openModal,
    closeModal,

    // Data
    filteredStores,
    filteredBrands,
    isFavorite,

    // Camera
    handleMapIdle,
    userLocation,

    // Marker
    selectedMarkerId,
    selectedStore,
    handleMarkerPress,
    clearSelection,

    // Bottom Sheets
    emptyBrandVisible,
    detailBrandVisible,
    hideSheet,
    showSheet,

    // Actions
    handleLocationSearch,
    handleNavigateSearch,
    searchStoresByLocation,
  };
};

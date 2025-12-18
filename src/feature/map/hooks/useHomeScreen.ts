import { useRef, useState } from 'react';

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

import { useModal } from '@/shared/hooks/useModal';
import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';

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
    brandFilterVisible,
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
    brandFilterVisible,
    hideSheet,
    showSheet,

    // Actions
    handleLocationSearch,
    handleNavigateSearch,
    searchStoresByLocation,

    // Navigation
    navigation,
  };
};

import { useState, useCallback } from 'react';

import { StoreDetail } from '../types';

export const useMarker = () => {
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [selectedStore, setSelectedStore] = useState<StoreDetail | null>(null);

  const handleMarkerPress = useCallback((store: StoreDetail) => {
    setSelectedMarkerId(prev =>
      prev === store.storeId ? null : store.storeId,
    );
    setSelectedStore(prev => (prev?.storeId === store.storeId ? null : store));
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedMarkerId(null);
    setSelectedStore(null);
  }, []);

  console.log(selectedMarkerId, selectedStore);

  return {
    handleMarkerPress,
    selectedMarkerId,
    selectedStore,
    setSelectedMarkerId,
    clearSelection,
  };
};

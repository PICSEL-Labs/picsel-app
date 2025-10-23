import { useState, useCallback } from 'react';

export interface SelectedStore {
  storeId: string;
  storeName: string;
  brandName: string;
  address: string;
  distance: number;
  brandIconImageUrl: string;
}

export const useMarker = () => {
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [selectedStore, setSelectedStore] = useState<SelectedStore | null>(
    null,
  );

  const handleMarkerPress = useCallback((store: SelectedStore) => {
    setSelectedMarkerId(prev =>
      prev === store.storeId ? null : store.storeId,
    );
    setSelectedStore(prev => (prev?.storeId === store.storeId ? null : store));
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedMarkerId(null);
    setSelectedStore(null);
  }, []);

  return {
    handleMarkerPress,
    selectedMarkerId,
    selectedStore,
    setSelectedMarkerId,
    clearSelection,
  };
};

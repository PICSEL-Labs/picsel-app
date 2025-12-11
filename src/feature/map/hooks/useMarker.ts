import { useCallback, useState, useRef } from 'react';

import { StoreDetail } from '../types';

export const useMarker = () => {
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [selectedStore, setSelectedStore] = useState<StoreDetail | null>(null);

  const processingRef = useRef(false);

  const handleMarkerPress = useCallback(
    (store: StoreDetail) => {
      if (processingRef.current) {
        return;
      }

      processingRef.current = true;

      const isDeselecting = selectedMarkerId === store.storeId;

      if (isDeselecting) {
        setSelectedMarkerId(null);
        setSelectedStore(null);
      } else {
        setSelectedMarkerId(store.storeId);
        setSelectedStore(store);
      }

      setTimeout(() => {
        processingRef.current = false;
      }, 100);
    },
    [selectedMarkerId],
  );

  console.log(selectedMarkerId, selectedStore);

  const clearSelection = useCallback(() => {
    if (processingRef.current) {
      return;
    }

    processingRef.current = true;
    setSelectedMarkerId(null);
    setSelectedStore(null);

    setTimeout(() => {
      processingRef.current = false;
    }, 100);
  }, []);

  return {
    handleMarkerPress,
    selectedMarkerId,
    selectedStore,
    setSelectedMarkerId,
    clearSelection,
  };
};

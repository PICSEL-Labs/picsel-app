import { useCallback, useState, useRef } from 'react';

import { StoreDetail } from '../types';

export const useMarker = () => {
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [selectedStore, setSelectedStore] = useState<StoreDetail | null>(null);

  const processingRef = useRef(false);
  const lastActionTimeRef = useRef(0);

  const handleMarkerPress = useCallback(
    (store: StoreDetail) => {
      const now = Date.now();

      if (now - lastActionTimeRef.current < 300) {
        return;
      }

      if (processingRef.current) {
        return;
      }

      lastActionTimeRef.current = now;
      processingRef.current = true;

      const isDeselecting = selectedMarkerId === store.storeId;

      console.log(store.storeName, 'storeId:', store.storeId);

      if (isDeselecting) {
        setSelectedMarkerId(null);
        setSelectedStore(null);
      } else {
        setSelectedMarkerId(store.storeId);
        setSelectedStore(store);
      }

      setTimeout(() => {
        processingRef.current = false;
      }, 300);
    },
    [selectedMarkerId],
  );

  const clearSelection = useCallback(() => {
    if (processingRef.current) {
      return;
    }

    processingRef.current = true;
    setSelectedMarkerId(null);
    setSelectedStore(null);

    setTimeout(() => {
      processingRef.current = false;
    }, 300);
  }, []);

  return {
    handleMarkerPress,
    selectedMarkerId,
    selectedStore,
    setSelectedMarkerId,
    clearSelection,
  };
};

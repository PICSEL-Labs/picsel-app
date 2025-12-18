import { useCallback, useState, useRef } from 'react';

import { StoreDetail } from '../types';

interface Props {
  handleMarkerPress: (store: StoreDetail, isFromSearch?: boolean) => void;
  selectedMarkerId: string | null;
  selectedStore: StoreDetail | null;
  setSelectedMarkerId: (id: string | null) => void;
  clearSelection: (keepSearched?: boolean) => void;
}

export const useMarker = (): Props => {
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [selectedStore, setSelectedStore] = useState<StoreDetail | null>(null);

  const processingRef = useRef(false);
  const lastActionTimeRef = useRef(0);

  const handleMarkerPress = useCallback(
    (store: StoreDetail, _isFromSearch = false) => {
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

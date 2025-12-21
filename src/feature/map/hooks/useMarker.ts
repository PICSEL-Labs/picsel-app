import { useCallback, useState, useRef } from 'react';

import { StoreDetail } from '../types';

interface UseMarkerReturn {
  handleMarkerPress: (store: StoreDetail, isFromSearch?: boolean) => void;
  selectedMarkerId: string | null;
  selectedStore: StoreDetail | null;
  setSelectedMarkerId: (id: string | null) => void;
  clearSelection: (keepSearched?: boolean) => void;
}

export const useMarker = (): UseMarkerReturn => {
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [selectedStore, setSelectedStore] = useState<StoreDetail | null>(null);

  const processingRef = useRef(false);
  const lastActionTimeRef = useRef(0);
  const lastMarkerSelectTimeRef = useRef(0);

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
        lastMarkerSelectTimeRef.current = now;
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
    const now = Date.now();

    // 마커 선택 후 500ms 이내에는 clearSelection 차단 (바텀시트 열리는 시간 확보)
    if (now - lastMarkerSelectTimeRef.current < 500) {
      return;
    }

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

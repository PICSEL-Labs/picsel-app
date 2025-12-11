import { useCallback, useState, useRef } from 'react';

import { StoreDetail } from '../types';

export const useMarker = () => {
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [selectedStore, setSelectedStore] = useState<StoreDetail | null>(null);

  console.log(selectedMarkerId, selectedStore);

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
    console.log('🧹 clearSelection 호출됨');
    console.trace(); // ✅ 호출 스택 출력

    if (processingRef.current) {
      console.log('🚫 clearSelection 중복 호출 방지');
      return;
    }

    console.log('🧹 선택 초기화');
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

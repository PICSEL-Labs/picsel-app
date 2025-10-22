import { useState, useCallback } from 'react';

export const useMarker = () => {
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

  const handleMarkerPress = useCallback((storeId: string) => {
    setSelectedMarkerId(prev => (prev === storeId ? null : storeId));
  }, []);

  return {
    handleMarkerPress,
    selectedMarkerId,
    setSelectedMarkerId,
  };
};

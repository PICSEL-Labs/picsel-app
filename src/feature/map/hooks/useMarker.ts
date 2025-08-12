import { useState } from 'react';

export const useMarker = () => {
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

  const handleMarkerPress = (storeId: string) => {
    setSelectedMarkerId(prev => (prev === storeId ? prev : storeId));
  };

  return {
    handleMarkerPress,
    selectedMarkerId,
  };
};

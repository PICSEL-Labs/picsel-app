import { useEffect } from 'react';

import { NaverMapViewRef } from '@mj-studio/react-native-naver-map';

interface UseMapEffectsParams {
  getCurrentLocation: () => Promise<{
    latitude: number;
    longitude: number;
  } | null>;
  mapRef: React.RefObject<NaverMapViewRef>;
  selectedMarkerId: string | null;
  showSheet: (type: 'nearby' | 'detail') => void;
  hideSheet: (type: 'nearby' | 'detail') => void;
}

export const useMapEffects = ({
  getCurrentLocation,
  mapRef,
  selectedMarkerId,
  showSheet,
  hideSheet,
}: UseMapEffectsParams) => {
  useEffect(() => {
    (async () => {
      const location = await getCurrentLocation();
      if (location) {
        mapRef.current?.animateCameraTo({
          ...location,
          zoom: 15,
          duration: 500,
        });
      }
    })();
  }, [getCurrentLocation, mapRef]);

  useEffect(() => {
    if (selectedMarkerId) {
      showSheet('detail');
    } else {
      hideSheet('detail');
    }
  }, [selectedMarkerId, showSheet, hideSheet]);
};

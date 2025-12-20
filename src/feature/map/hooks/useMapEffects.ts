import { useEffect, useRef } from 'react';

interface UseMapEffectsParams {
  selectedMarkerId: string | null;
  showSheet: (type: 'empty' | 'detail') => void;
  hideSheet: (type: 'empty' | 'detail') => void;
}

export const useMapEffects = ({
  selectedMarkerId,
  showSheet,
  hideSheet,
}: UseMapEffectsParams) => {
  const lastSelectedMarkerIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (
      selectedMarkerId === lastSelectedMarkerIdRef.current &&
      lastSelectedMarkerIdRef.current !== null
    ) {
      return;
    }

    lastSelectedMarkerIdRef.current = selectedMarkerId;

    if (selectedMarkerId) {
      showSheet('detail');
    } else {
      hideSheet('detail');
    }
  }, [selectedMarkerId, showSheet, hideSheet]);
};

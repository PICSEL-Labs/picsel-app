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
    // 같은 값이면 스킵 (null → null 포함)
    if (selectedMarkerId === lastSelectedMarkerIdRef.current) {
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

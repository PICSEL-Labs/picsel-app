import { useEffect } from 'react';

interface UseMapEffectsParams {
  selectedMarkerId: string | null;
  showSheet: (type: 'nearby' | 'detail') => void;
  hideSheet: (type: 'nearby' | 'detail') => void;
}

export const useMapEffects = ({
  selectedMarkerId,
  showSheet,
  hideSheet,
}: UseMapEffectsParams) => {
  useEffect(() => {
    if (selectedMarkerId) {
      showSheet('detail');
    } else {
      hideSheet('detail');
    }
  }, [selectedMarkerId, showSheet, hideSheet]);
};

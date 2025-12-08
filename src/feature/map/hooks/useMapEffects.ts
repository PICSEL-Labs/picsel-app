import { useEffect } from 'react';

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
  useEffect(() => {
    if (selectedMarkerId) {
      showSheet('detail');
    } else {
      hideSheet('detail');
    }
  }, [selectedMarkerId, showSheet, hideSheet]);
};

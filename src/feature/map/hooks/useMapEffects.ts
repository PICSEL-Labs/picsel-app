import { useEffect } from 'react';

interface UseMapEffectsParams {
  selectedMarkerId: string | null;
  showSheet: () => void;
  hideSheet: () => void;
}

export const useMapEffects = ({
  selectedMarkerId,
  showSheet,
  hideSheet,
}: UseMapEffectsParams) => {
  useEffect(() => {
    if (selectedMarkerId) {
      showSheet();
    } else {
      hideSheet();
    }
  }, [selectedMarkerId, showSheet, hideSheet]);
};

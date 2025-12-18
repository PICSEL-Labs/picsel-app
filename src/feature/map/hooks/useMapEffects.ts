import { useEffect, useRef } from 'react';

interface Props {
  selectedMarkerId: string | null;
  showSheet: (type: 'empty' | 'detail') => void;
  hideSheet: (type: 'empty' | 'detail') => void;
}

export const useMapEffects = ({
  selectedMarkerId,
  showSheet,
  hideSheet,
}: Props) => {
  const lastSelectedMarkerIdRef = useRef<string | null>(null);
  const processingRef = useRef(false);

  useEffect(() => {
    if (
      selectedMarkerId === lastSelectedMarkerIdRef.current &&
      lastSelectedMarkerIdRef.current !== null
    ) {
      return;
    }

    if (processingRef.current) {
      return;
    }

    processingRef.current = true;
    lastSelectedMarkerIdRef.current = selectedMarkerId;

    if (selectedMarkerId) {
      showSheet('detail');
    } else {
      hideSheet('detail');
    }

    setTimeout(() => {
      processingRef.current = false;
    }, 100);
  }, [selectedMarkerId, showSheet, hideSheet]);
};

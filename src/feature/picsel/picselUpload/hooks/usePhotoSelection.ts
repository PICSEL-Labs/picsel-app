import { useCallback } from 'react';

import { usePhotoStore } from '@/shared/store/picselUpload';
import { useToastStore } from '@/shared/store/ui/toast';

export const usePhotoSelection = (variant: 'main' | 'extra') => {
  const MAX_EXTRA_COUNT = 10;
  const { showToast } = useToastStore();

  const {
    mainPhoto,
    extraPhotos,
    setMainPhoto,
    addExtraPhotos,
    setExtraPhotos,
    removeExtraPhoto,
  } = usePhotoStore();

  const selectMainPhoto = useCallback(
    (uri: string) => {
      if (mainPhoto === uri) {
        setMainPhoto(null);
        return;
      }

      if (mainPhoto) {
        showToast('대표사진은 1장만 선택 가능해요', 60);
        return;
      }

      setMainPhoto(uri);
    },
    [mainPhoto, setMainPhoto, showToast],
  );

  const selectExtraPhoto = useCallback(
    (uri: string) => {
      const index = extraPhotos.indexOf(uri);

      if (index !== -1) {
        removeExtraPhoto(index);
        return;
      }

      if (extraPhotos.length >= MAX_EXTRA_COUNT) {
        showToast('사진은 최대 10장까지 선택 가능해요', 60);
        return;
      }

      addExtraPhotos([uri]);
    },
    [extraPhotos, addExtraPhotos, removeExtraPhoto, showToast],
  );

  const resetCurrentPhoto = useCallback(() => {
    if (variant === 'main') {
      setMainPhoto(null);
    } else {
      setExtraPhotos([]);
    }
  }, [variant, setMainPhoto]);

  return {
    mainPhoto,
    extraPhotos,
    selectMainPhoto,
    selectExtraPhoto,
    resetCurrentPhoto,
  };
};

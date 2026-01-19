import { useCallback } from 'react';

import { usePhotoStore } from '@/shared/store/picselUpload';
import { useToastStore } from '@/shared/store/ui/toast';

export const usePhotoSelection = () => {
  const MAX_EXTRA_COUNT = 10;
  const { showToast } = useToastStore();

  const {
    mainPhoto,
    extraPhotos,
    setMainPhoto,
    addExtraPhotos,
    removeExtraPhoto,
  } = usePhotoStore();

  const selectMainPhoto = useCallback(
    (uri: string) => {
      if (mainPhoto) {
        showToast('대표사진은 1장만 선택 가능해요', 60);
        return;
      }
      setMainPhoto(uri);
    },
    [mainPhoto, setMainPhoto, showToast],
  );

  const toggleExtraPhoto = useCallback(
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

  return {
    mainPhoto,
    extraPhotos,
    selectMainPhoto,
    toggleExtraPhoto,
  };
};

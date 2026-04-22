import { useCallback } from 'react';

import { usePhotoStore } from '@/shared/store/picselUpload';
import { useToastStore } from '@/shared/store/ui/toast';

export const usePhotoSelection = (
  variant: 'main' | 'extra' | 'cover',
  allowReplace = false,
) => {
  const MAX_EXTRA_COUNT = 10;
  const { showToast } = useToastStore();

  const {
    mainPhoto,
    extraPhotos,
    bookCoverPhoto,
    setMainPhoto,
    addExtraPhotos,
    setExtraPhotos,
    setBookCoverPhoto,
    removeExtraPhoto,
  } = usePhotoStore();

  const selectMainPhoto = useCallback(
    (uri: string) => {
      if (mainPhoto === uri) {
        setMainPhoto(null);
        return;
      }

      if (mainPhoto && !allowReplace) {
        showToast('대표사진은 1장만 선택 가능해요', 60);
        return;
      }

      setMainPhoto(uri);
    },
    [mainPhoto, setMainPhoto, showToast, allowReplace],
  );

  const selectBookCoverPhoto = useCallback(
    (uri: string) => {
      if (bookCoverPhoto === uri) {
        setBookCoverPhoto(null);
        return;
      }
      setBookCoverPhoto(uri);
    },
    [bookCoverPhoto, setBookCoverPhoto],
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
    } else if (variant === 'extra') {
      setExtraPhotos([]);
    } else {
      setBookCoverPhoto(null);
    }
  }, [variant, setMainPhoto, setBookCoverPhoto, setExtraPhotos]);

  return {
    mainPhoto,
    extraPhotos,
    bookCoverPhoto,
    selectMainPhoto,
    selectExtraPhoto,
    selectBookCoverPhoto,
    resetCurrentPhoto,
  };
};

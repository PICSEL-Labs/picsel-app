import { useMemo } from 'react';

import { AlbumGroupType } from './useAlbumList';
import { useCameraCapture } from './useCameraCapture';
import { usePhotoGrid } from './usePhotoGrid';
import { usePhotoSelection } from './usePhotoSelection';

export const usePhotoPicker = (
  variant: 'main' | 'extra' | 'cover',
  albumName: string | null,
  groupTypes: AlbumGroupType | null,
  allowReplace = false,
) => {
  const { photos, fetchPhotos, hasNextPage, appendCapturedPhoto } =
    usePhotoGrid(albumName, groupTypes);

  const {
    mainPhoto,
    extraPhotos,
    bookCoverPhoto,
    selectMainPhoto,
    selectExtraPhoto,
    selectBookCoverPhoto,
    resetCurrentPhoto,
  } = usePhotoSelection(variant, allowReplace);

  const { capturePhoto } = useCameraCapture();

  const selectedUris = useMemo(() => {
    switch (variant) {
      case 'main':
        return mainPhoto ? [mainPhoto] : [];
      case 'cover':
        return bookCoverPhoto ? [bookCoverPhoto] : [];
      case 'extra':
        return extraPhotos;
      default:
        return [];
    }
  }, [variant, mainPhoto, bookCoverPhoto, extraPhotos]);

  const selectedCount = selectedUris.length;

  const handleReset = () => {
    resetCurrentPhoto();
  };

  const handleSelectPhoto = (uri: string) => {
    if (variant === 'main') {
      selectMainPhoto(uri);
    } else if (variant === 'extra') {
      selectExtraPhoto(uri);
    } else {
      selectBookCoverPhoto(uri);
    }
  };

  const handleOpenCamera = async () => {
    const photo = await capturePhoto();

    if (!photo) {
      return;
    }

    appendCapturedPhoto(photo);

    if (variant === 'main') {
      selectMainPhoto(photo.uri);
    } else if (variant === 'extra') {
      selectExtraPhoto(photo.uri);
    } else {
      selectBookCoverPhoto(photo.uri);
    }
  };

  return {
    photos,
    selectedUris,
    selectedCount,
    fetchPhotos,
    hasNextPage,
    handleSelectPhoto,
    handleOpenCamera,
    resetSelection: handleReset,
  };
};

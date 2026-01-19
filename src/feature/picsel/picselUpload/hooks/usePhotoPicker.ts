import { useCameraCapture } from './useCameraCapture';
import { usePhotoGrid } from './usePhotoGrid';
import { usePhotoSelection } from './usePhotoSelection';

export const usePhotoPicker = (variant: 'main' | 'extra') => {
  const { photos, fetchPhotos, hasNextPage, appendCapturedPhoto, resetPhotos } =
    usePhotoGrid();

  const { mainPhoto, extraPhotos, selectMainPhoto, toggleExtraPhoto } =
    usePhotoSelection();

  const { capturePhoto } = useCameraCapture();

  const isMain = variant === 'main';

  const selectedUris = isMain ? (mainPhoto ? [mainPhoto] : []) : extraPhotos;
  const selectedCount = isMain ? selectedUris.length : extraPhotos.length;

  const handleSelectPhoto = (uri: string) => {
    if (variant === 'main') {
      selectMainPhoto(uri);
    } else {
      toggleExtraPhoto(uri);
    }
  };

  const handleOpenCamera = async () => {
    const photo = await capturePhoto();
    if (!photo) {
      return;
    }

    if (variant === 'main') {
      selectMainPhoto(photo.uri);
      return;
    }

    appendCapturedPhoto(photo);
    toggleExtraPhoto(photo.uri);
  };

  return {
    photos,
    selectedUris,
    selectedCount,
    fetchPhotos,
    hasNextPage,
    handleSelectPhoto,
    handleOpenCamera,
    resetSelection: resetPhotos,
  };
};

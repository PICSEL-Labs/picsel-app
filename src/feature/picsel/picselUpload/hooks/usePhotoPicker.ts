import { useCameraCapture } from './useCameraCapture';
import { usePhotoGrid } from './usePhotoGrid';
import { usePhotoSelection } from './usePhotoSelection';

export const usePhotoPicker = (variant: 'main' | 'extra') => {
  const { photos, fetchPhotos, hasNextPage, appendCapturedPhoto } =
    usePhotoGrid();

  const {
    mainPhoto,
    extraPhotos,
    selectMainPhoto,
    selectExtraPhoto,
    resetCurrentPhoto,
  } = usePhotoSelection(variant);

  const { capturePhoto } = useCameraCapture();

  const isMain = variant === 'main';

  const selectedUris = isMain ? (mainPhoto ? [mainPhoto] : []) : extraPhotos;
  const selectedCount = isMain ? selectedUris.length : extraPhotos.length;

  const handleReset = () => {
    resetCurrentPhoto();
  };

  const handleSelectPhoto = (uri: string) => {
    if (variant === 'main') {
      selectMainPhoto(uri);
    } else {
      selectExtraPhoto(uri);
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
      return;
    }

    selectExtraPhoto(photo.uri);
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

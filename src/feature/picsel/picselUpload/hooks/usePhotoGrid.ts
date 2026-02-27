import { useMemo, useState } from 'react';

import { GridPhoto, useInfiniteScrollPhotos } from './useInfiniteScrollPhotos';

export const usePhotoGrid = (
  albumName: string | null,
  groupTypes: 'Album' | 'SmartAlbum' | null,
) => {
  const [capturedPhotos, setCapturedPhotos] = useState<GridPhoto[]>([]);
  const { photos, fetchPhotos, hasNextPage, resetPhotos } =
    useInfiniteScrollPhotos(albumName, groupTypes);

  const combinedPhotos = useMemo(
    () => [
      ...capturedPhotos,
      ...photos.filter(p => !capturedPhotos.some(c => c.uri === p.uri)),
    ],
    [capturedPhotos, photos],
  );

  return {
    photos: combinedPhotos,
    fetchPhotos,
    hasNextPage,
    resetPhotos,
    appendCapturedPhoto: (photo: GridPhoto) =>
      setCapturedPhotos(prev => [photo, ...prev]),
    resetCapturedPhotos: () => setCapturedPhotos([]),
  };
};

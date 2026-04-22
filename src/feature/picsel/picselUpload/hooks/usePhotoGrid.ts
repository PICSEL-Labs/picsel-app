import { useMemo, useState } from 'react';

import { DisplayGroupType } from './useAlbumList';
import { GridPhoto, useInfiniteScrollPhotos } from './useInfiniteScrollPhotos';

export const usePhotoGrid = (
  albumName: string | null,
  groupTypes: DisplayGroupType | null,
) => {
  const [capturedPhotos, setCapturedPhotos] = useState<GridPhoto[]>([]);
  const { photos, fetchPhotos, hasNextPage, resetPhotos } =
    useInfiniteScrollPhotos(albumName, groupTypes);

  const combinedPhotos = useMemo(() => {
    if (capturedPhotos.length === 0) {
      return photos;
    }

    const capturedUris = new Set(capturedPhotos.map(c => c.uri));

    return [...capturedPhotos, ...photos.filter(p => !capturedUris.has(p.uri))];
  }, [capturedPhotos, photos]);

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

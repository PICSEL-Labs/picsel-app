import { useState } from 'react';

interface UsePhotoSelectionReturn {
  isSelecting: boolean;
  selectedPhotos: string[];
  setIsSelecting: (value: boolean) => void;
  setSelectedPhotos: (value: string[]) => void;
  toggleSelection: (photoId: string) => void;
  selectAll: (totalPhotos: number, photoData: { id: string }[]) => void;
  clearSelection: () => void;
  resetSelection: () => void;
}

export const usePhotoSelection = (): UsePhotoSelectionReturn => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  const toggleSelection = (photoId: string) => {
    if (selectedPhotos.includes(photoId)) {
      setSelectedPhotos(selectedPhotos.filter(id => id !== photoId));
    } else {
      setSelectedPhotos([...selectedPhotos, photoId]);
    }
  };

  const selectAll = (totalPhotos: number, photoData: { id: string }[]) => {
    if (selectedPhotos.length === totalPhotos) {
      setSelectedPhotos([]);
    } else {
      const allPhotoIds = photoData.map(photo => photo.id);
      setSelectedPhotos(allPhotoIds);
    }
  };

  const clearSelection = () => {
    setSelectedPhotos([]);
  };

  const resetSelection = () => {
    setIsSelecting(false);
    setSelectedPhotos([]);
  };

  return {
    isSelecting,
    selectedPhotos,
    setIsSelecting,
    setSelectedPhotos,
    toggleSelection,
    selectAll,
    clearSelection,
    resetSelection,
  };
};

import { useCallback, useEffect, useState } from 'react';

import { Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

import { useInfiniteScrollPhotos } from './useInfiniteScrollPhotos';

import { useToastStore } from '@/shared/store/ui/toast';

/**
 * usePhotoPicker
 * - 대표 사진 선택 / 카메라 촬영 / 무한 스크롤 사진 로드 통합 훅
 */
export const usePhotoPicker = () => {
  const [selectedUri, setSelectedUri] = useState<string | null>(null);
  const { showToast } = useToastStore();

  const { photos, fetchPhotos, hasNextPage, resetPhotos } =
    useInfiniteScrollPhotos();

  const handleSelectPhoto = useCallback(
    (uri: string) => {
      if (selectedUri === uri) {
        return setSelectedUri(null);
      }

      const isAnotherPhotoSelected = selectedUri && selectedUri !== uri;
      if (isAnotherPhotoSelected) {
        showToast('대표사진은 1장만 선택 가능해요', 60);
        return;
      }

      setSelectedUri(uri);
    },
    [selectedUri, showToast],
  );

  const handleOpenCamera = useCallback(async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        cameraType: 'back',
        saveToPhotos: true,
        presentationStyle: 'pageSheet',
      });

      const uri = result.assets?.[0]?.uri;
      if (!uri) {
        return;
      }

      setSelectedUri(uri);
      showToast('사진이 선택되었습니다', 50);
    } catch (error) {
      console.log('카메라 실행 실패:', error);
      Alert.alert('카메라를 실행할 수 없습니다.');
    }
  }, [showToast]);

  const resetSelection = useCallback(() => setSelectedUri(null), []);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return {
    photos,
    hasNextPage,
    selectedUri,
    fetchPhotos,
    handleSelectPhoto,
    handleOpenCamera,
    resetSelection,
    resetPhotos,
  };
};

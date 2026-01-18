import { useCallback, useEffect, useState } from 'react';

import { Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

import { useInfiniteScrollPhotos } from './useInfiniteScrollPhotos';

import { useToastStore } from '@/shared/store/ui/toast';

/**
 * usePhotoPicker
 * - 대표 사진 선택 / 카메라 촬영 / 무한 스크롤 사진 로드 통합 훅
 */
export const usePhotoPicker = (variant: 'main' | 'extra') => {
  const MAX_EXTRA_COUNT = 10;

  const [selectedUris, setSelectedUris] = useState<string[]>([]);

  const { showToast } = useToastStore();

  const { photos, fetchPhotos, hasNextPage, resetPhotos } =
    useInfiniteScrollPhotos();

  const handleSelectPhoto = useCallback(
    (uri: string) => {
      // 이미 선택된 경우 → 해제
      if (selectedUris.includes(uri)) {
        setSelectedUris(prev => prev.filter(u => u !== uri));
        return;
      }

      // extra + 10장 초과
      if (variant === 'extra' && selectedUris.length >= 10) {
        showToast('사진은 최대 10장까지 선택 가능해요', 60);
        return;
      }

      // main + 이미 선택 있음
      if (variant === 'main' && selectedUris.length >= 1) {
        showToast('대표사진은 1장만 선택 가능해요', 60);
        return;
      }

      // 정상 추가
      setSelectedUris(prev => [...prev, uri]);
    },
    [variant, selectedUris, showToast],
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

      if (variant === 'main') {
        setSelectedUris([uri]);
      } else {
        setSelectedUris(prev =>
          prev.length >= MAX_EXTRA_COUNT ? prev : [...prev, uri],
        );
      }

      showToast('사진이 선택되었습니다', 50);
    } catch (error) {
      Alert.alert('카메라를 실행할 수 없습니다.');
    }
  }, [variant, showToast]);

  const resetSelection = useCallback(() => {
    setSelectedUris([]);
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return {
    photos,
    hasNextPage,
    selectedUris,
    selectedCount: selectedUris.length,
    fetchPhotos,
    handleSelectPhoto,
    handleOpenCamera,
    resetSelection,
    resetPhotos,
  };
};

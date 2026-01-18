import { useCallback, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

import { GridPhoto, useInfiniteScrollPhotos } from './useInfiniteScrollPhotos';

import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { usePhotoStore } from '@/shared/store/picselUpload';
import { useToastStore } from '@/shared/store/ui/toast';

/**
 * usePhotoPicker
 * - 대표 사진 및 추가 사진 선택 정책 관리
 * - 카메라 촬영 후 그리드 내 반영
 * - 무한 스크롤 사진 로드
 */
export const usePhotoPicker = (variant: 'main' | 'extra') => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const MAX_EXTRA_COUNT = 10;

  const [capturedPhotos, setCapturedPhotos] = useState<GridPhoto[]>([]);

  const { showToast } = useToastStore();

  const { photos, fetchPhotos, hasNextPage, resetPhotos } =
    useInfiniteScrollPhotos();

  const {
    mainPhoto,
    extraPhotos,
    setMainPhoto,
    addExtraPhotos,
    removeExtraPhoto,
    reset,
  } = usePhotoStore();

  /** Grid에 보여줄 사진 (촬영 + 앨범) */
  const combinedPhotos: GridPhoto[] = [
    ...capturedPhotos,
    ...photos.filter(photo => !capturedPhotos.some(c => c.uri === photo.uri)),
  ];

  /** 선택된 이미지 */
  const selectedUris =
    variant === 'main' ? (mainPhoto ? [mainPhoto] : []) : extraPhotos;

  /** 추가 사진 선택 정책 */
  const tryAddExtraPhoto = useCallback(
    (uri: string) => {
      if (extraPhotos.includes(uri)) {
        return;
      }

      if (extraPhotos.length >= MAX_EXTRA_COUNT) {
        showToast('사진은 최대 10장까지 선택 가능해요', 60);
        return;
      }

      addExtraPhotos([uri]);
    },
    [extraPhotos, addExtraPhotos, showToast],
  );

  const handleSelectPhoto = useCallback(
    (uri: string) => {
      /** 대표사진 선택의 경우 */
      if (variant === 'main') {
        if (mainPhoto) {
          showToast('대표사진은 1장만 선택 가능해요', 60);
          return;
        }

        setMainPhoto(uri);
        return;
      }

      const index = extraPhotos.indexOf(uri);

      if (index !== -1) {
        removeExtraPhoto(index);
        return;
      }

      tryAddExtraPhoto(uri);
    },
    [
      variant,
      mainPhoto,
      extraPhotos,
      setMainPhoto,
      removeExtraPhoto,
      tryAddExtraPhoto,
      showToast,
    ],
  );

  /** 카메라 촬영 */
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

      /** 대표사진 촬영 */
      if (variant === 'main') {
        if (mainPhoto) {
          showToast('대표사진은 1장만 선택 가능해요', 60);
          return;
        }

        setMainPhoto(uri);
        navigation.navigate('RegisterPhoto');
        return;
      }

      /** 추가사진 촬영 */
      const photo: GridPhoto = {
        id: uri,
        uri,
        source: 'camera',
      };

      setCapturedPhotos(prev => [photo, ...prev]);
      tryAddExtraPhoto(uri);
    } catch {
      Alert.alert('카메라를 실행할 수 없습니다.');
    }
  }, [
    variant,
    navigation,
    mainPhoto,
    setMainPhoto,
    showToast,
    tryAddExtraPhoto,
  ]);

  /** 선택 초기화 */
  const resetSelection = useCallback(() => {
    if (variant === 'main') {
      setMainPhoto(null);
      return;
    }

    reset();
    resetPhotos();
    setCapturedPhotos([]);
  }, [variant, reset, resetPhotos, setMainPhoto]);

  /** 최초 진입 시 앨범 사진 로드 */
  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return {
    photos: combinedPhotos,
    hasNextPage,
    selectedUris,
    selectedCount: selectedUris.length,
    fetchPhotos,
    handleSelectPhoto,
    handleOpenCamera,
    resetSelection,
  };
};

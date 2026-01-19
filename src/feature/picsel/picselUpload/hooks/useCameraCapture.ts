import { useCallback } from 'react';

import { Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

import { GridPhoto } from './useInfiniteScrollPhotos';

export const useCameraCapture = () => {
  const capturePhoto = useCallback(async (): Promise<GridPhoto | null> => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        cameraType: 'back',
        saveToPhotos: true,
        presentationStyle: 'pageSheet',
      });

      const uri = result.assets?.[0]?.uri;
      if (!uri) {
        return null;
      }

      return {
        id: uri,
        uri,
        source: 'camera',
      };
    } catch {
      Alert.alert('카메라를 실행할 수 없습니다.');
      return null;
    }
  }, []);

  return { capturePhoto };
};

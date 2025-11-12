import { useCallback, useRef, useState } from 'react';

import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import { Alert } from 'react-native';

export const useInfiniteScrollPhotos = () => {
  const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
  const [endCursor, setEndCursor] = useState<string | undefined>();
  const [hasNextPage, setHasNextPage] = useState(true);
  const loadingRef = useRef(false);

  const fetchPhotos = useCallback(async () => {
    if (loadingRef.current || !hasNextPage) {
      return;
    }

    loadingRef.current = true;
    try {
      const { edges, page_info } = await CameraRoll.getPhotos({
        first: 40,
        after: endCursor,
        assetType: 'Photos',
      });

      if (page_info.end_cursor === endCursor) {
        return;
      }

      setPhotos(prev => [...prev, ...edges]);
      setEndCursor(page_info.end_cursor);
      setHasNextPage(page_info.has_next_page);
    } catch (error) {
      console.log('사진 불러오기 실패:', error);
      Alert.alert('사진을 불러올 수 없습니다.');
    } finally {
      loadingRef.current = false;
    }
  }, [endCursor, hasNextPage]);

  const resetPhotos = useCallback(() => {
    setPhotos([]);
    setEndCursor(undefined);
    setHasNextPage(true);
  }, []);

  return {
    photos,
    hasNextPage,
    fetchPhotos,
    resetPhotos,
  };
};

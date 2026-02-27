import { useCallback, useEffect, useRef, useState } from 'react';

import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { Alert } from 'react-native';

export type GridPhoto = {
  id: string;
  uri: string;
  source: 'gallery' | 'camera';
};

export const useInfiniteScrollPhotos = (
  albumName: string | null,
  groupTypes: 'Album' | 'SmartAlbum' | null,
) => {
  const [photos, setPhotos] = useState<GridPhoto[]>([]);
  const [endCursor, setEndCursor] = useState<string | undefined>();
  const [hasNextPage, setHasNextPage] = useState(true);
  const loadingRef = useRef(false);

  const fetchPhotos = useCallback(async () => {
    if (loadingRef.current || !hasNextPage) {
      return;
    }

    loadingRef.current = true;
    try {
      const fetchCount = endCursor ? 100 : 15;

      const { edges, page_info } = await CameraRoll.getPhotos({
        first: fetchCount,
        after: endCursor,
        assetType: 'Photos',
        ...(albumName &&
          groupTypes && {
            groupName: albumName,
            groupTypes,
          }),
      });

      const mappedPhotos: GridPhoto[] = edges.map(edge => ({
        id: edge.node.id,
        uri: edge.node.image.uri,
        source: 'gallery',
      }));

      if (page_info.end_cursor === endCursor) {
        return;
      }

      setPhotos(prev => [...prev, ...mappedPhotos]);

      setEndCursor(page_info.end_cursor);
      setHasNextPage(page_info.has_next_page);
    } catch (error) {
      console.log('사진 불러오기 실패:', error);
      Alert.alert('사진을 불러올 수 없습니다.');
    } finally {
      loadingRef.current = false;
    }
  }, [endCursor, hasNextPage, albumName, groupTypes]);

  useEffect(() => {
    setPhotos([]);
    setEndCursor(undefined);
    setHasNextPage(true);
    loadingRef.current = true;

    const loadFirstPage = async () => {
      try {
        const { edges, page_info } = await CameraRoll.getPhotos({
          first: 15,
          assetType: 'Photos',
          ...(albumName &&
            groupTypes && {
              groupName: albumName,
              groupTypes,
            }),
        });

        const mappedPhotos: GridPhoto[] = edges.map(edge => ({
          id: edge.node.id,
          uri: edge.node.image.uri,
          source: 'gallery',
        }));

        setPhotos(mappedPhotos);
        setEndCursor(page_info.end_cursor);
        setHasNextPage(page_info.has_next_page);
      } catch (error) {
        console.log('사진 불러오기 실패:', error);
      } finally {
        loadingRef.current = false;
      }
    };

    loadFirstPage();
  }, [albumName, groupTypes]);

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

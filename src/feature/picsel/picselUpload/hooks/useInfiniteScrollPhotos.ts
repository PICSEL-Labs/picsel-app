import { useEffect, useRef, useState, useCallback } from 'react';

import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { Alert } from 'react-native';

import { DisplayGroupType } from './useAlbumList';

export type GridPhoto = {
  id: string;
  uri: string;
  source: 'gallery' | 'camera';
};

const FIRST_PAGE_SIZE = 50;
const NEXT_PAGE_SIZE = 150;

const buildGroupParams = (
  name: string | null,
  type: DisplayGroupType | null,
) => {
  if (!name || !type || type === 'All') {
    return {};
  }

  return { groupName: name, groupTypes: type };
};

export const useInfiniteScrollPhotos = (
  albumName: string | null,
  groupTypes: DisplayGroupType | null,
) => {
  const [photos, setPhotos] = useState<GridPhoto[]>([]);
  const [endCursor, setEndCursor] = useState<string | undefined>();
  const [hasNextPage, setHasNextPage] = useState(true);
  const loadingRef = useRef(false);

  const albumNameRef = useRef(albumName);
  const groupTypesRef = useRef(groupTypes);
  albumNameRef.current = albumName;
  groupTypesRef.current = groupTypes;

  const endCursorRef = useRef(endCursor);
  const hasNextPageRef = useRef(hasNextPage);
  endCursorRef.current = endCursor;
  hasNextPageRef.current = hasNextPage;

  const fetchPhotos = useCallback(async () => {
    if (loadingRef.current || !hasNextPageRef.current) {
      return;
    }

    loadingRef.current = true;
    try {
      const { edges, page_info } = await CameraRoll.getPhotos({
        first: NEXT_PAGE_SIZE,
        after: endCursorRef.current,
        assetType: 'Photos',
        ...buildGroupParams(albumNameRef.current, groupTypesRef.current),
      });

      if (page_info.end_cursor === endCursorRef.current) {
        return;
      }

      const mappedPhotos: GridPhoto[] = edges.map(edge => ({
        id: edge.node.id,
        uri: edge.node.image.uri,
        source: 'gallery',
      }));

      setPhotos(prev => prev.concat(mappedPhotos));
      setEndCursor(page_info.end_cursor);
      setHasNextPage(page_info.has_next_page);
    } catch (error) {
      console.error('사진 불러오기 실패:', error);
      Alert.alert('사진을 불러올 수 없습니다.');
    } finally {
      loadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (!albumName || !groupTypes) {
      return;
    }

    setPhotos([]);
    setEndCursor(undefined);
    setHasNextPage(true);
    loadingRef.current = true;

    const loadFirstPage = async () => {
      try {
        const { edges, page_info } = await CameraRoll.getPhotos({
          first: FIRST_PAGE_SIZE,
          assetType: 'Photos',
          ...buildGroupParams(albumName, groupTypes),
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
        console.error('사진 불러오기 실패:', error);
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

import { useCallback, useEffect, useState } from 'react';

import { CameraRoll } from '@react-native-camera-roll/camera-roll';

export type AlbumGroupType = 'Album' | 'SmartAlbum';

export interface Album {
  title: string;
  count: number;
  thumbnailUri?: string;
  groupTypes: AlbumGroupType;
}

const getAlbumsByType = async () => {
  const [userAlbums, smartAlbums] = await Promise.all([
    CameraRoll.getAlbums({ assetType: 'Photos', albumType: 'Album' }),
    CameraRoll.getAlbums({ assetType: 'Photos', albumType: 'SmartAlbum' }),
  ]);

  const tagged = [
    ...userAlbums.map(a => ({ ...a, groupTypes: 'Album' as const })),
    ...smartAlbums.map(a => ({ ...a, groupTypes: 'SmartAlbum' as const })),
  ];

  return tagged
    .filter(
      (album, idx, arr) =>
        album.count > 0 && arr.findIndex(a => a.title === album.title) === idx,
    )
    .map(({ title, count, groupTypes }) => ({ title, count, groupTypes }))
    .sort((a, b) => b.count - a.count);
};

const fetchThumbnails = async (albumList: Album[]) => {
  const uris = await Promise.all(
    albumList.map(async album => {
      try {
        const { edges } = await CameraRoll.getPhotos({
          first: 1,
          assetType: 'Photos',
          groupName: album.title,
          groupTypes: album.groupTypes,
        });
        return edges[0]?.node.image.uri;
      } catch {
        return undefined;
      }
    }),
  );

  return albumList.map((album, i) => ({
    ...album,
    thumbnailUri: uris[i],
  }));
};

export const useAlbumList = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [isAlbumListOpen, setIsAlbumListOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const fetchAlbums = useCallback(async () => {
    try {
      const sorted = await getAlbumsByType();

      setAlbums(sorted);
      if (sorted.length > 0) {
        setSelectedAlbum(sorted[0].title);
      }
      setIsReady(true);

      const withThumbnails = await fetchThumbnails(sorted);
      setAlbums(withThumbnails);
    } catch (error) {
      console.error('앨범 목록 불러오기 실패:', error);
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  const toggleAlbumList = () => setIsAlbumListOpen(prev => !prev);

  const selectAlbum = (albumTitle: string) => {
    setSelectedAlbum(albumTitle);
    setIsAlbumListOpen(false);
  };

  const selectedGroupTypes =
    albums.find(a => a.title === selectedAlbum)?.groupTypes ?? null;

  return {
    albums,
    selectedAlbum,
    selectedGroupTypes,
    displayAlbumName: selectedAlbum ?? '',
    isAlbumListOpen,
    isReady,
    toggleAlbumList,
    selectAlbum,
  };
};

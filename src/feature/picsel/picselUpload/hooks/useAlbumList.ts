import { useCallback, useEffect, useState } from 'react';

import { CameraRoll } from '@react-native-camera-roll/camera-roll';

export type AlbumGroupType = 'Album' | 'SmartAlbum';

export interface Album {
  title: string;
  count: number;
  thumbnailUri?: string;
  groupTypes: AlbumGroupType;
}

export const useAlbumList = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [isAlbumListOpen, setIsAlbumListOpen] = useState(false);

  const fetchAlbums = useCallback(async () => {
    try {
      const [userAlbums, smartAlbums] = await Promise.all([
        CameraRoll.getAlbums({ assetType: 'Photos', albumType: 'Album' }),
        CameraRoll.getAlbums({ assetType: 'Photos', albumType: 'SmartAlbum' }),
      ]);
      const taggedUser = userAlbums.map(a => ({
        ...a,
        groupTypes: 'Album' as const,
      }));
      const taggedSmart = smartAlbums.map(a => ({
        ...a,
        groupTypes: 'SmartAlbum' as const,
      }));
      const albumData = [...taggedUser, ...taggedSmart];

      const uniqueAlbumData = albumData.filter(
        (album, idx, arr) =>
          album.count > 0 &&
          arr.findIndex(a => a.title === album.title) === idx,
      );

      const albumsWithThumbnails: Album[] = await Promise.all(
        uniqueAlbumData.map(async album => {
          let thumbnailUri: string | undefined;
          try {
            const { edges } = await CameraRoll.getPhotos({
              first: 1,
              assetType: 'Photos',
              groupName: album.title,
              groupTypes: album.groupTypes,
            });
            thumbnailUri = edges[0]?.node.image.uri;
          } catch {
            thumbnailUri = undefined;
          }
          return {
            title: album.title,
            count: album.count,
            thumbnailUri,
            groupTypes: album.groupTypes,
          };
        }),
      );

      const sorted = albumsWithThumbnails.sort((a, b) => b.count - a.count);
      setAlbums(sorted);
    } catch (error) {
      console.log('앨범 목록 불러오기 실패:', error);
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
    displayAlbumName: selectedAlbum ?? albums[0]?.title ?? '',
    isAlbumListOpen,
    toggleAlbumList,
    selectAlbum,
  };
};

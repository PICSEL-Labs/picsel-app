import { useCallback, useState } from 'react';

interface MapCamera {
  latitude: number;
  longitude: number;
  zoom: number;
}

// 이후 유저 위치 동의 받는 시점에 기본값 세팅 삭제
const INITIAL_CAMERA = {
  latitude: 37.5666102,
  longitude: 126.9783881,
  zoom: 16,
};

export const useMapCamera = () => {
  const [camera, setCamera] = useState<MapCamera>(INITIAL_CAMERA);
  const [showSearchButton, setShowSearchButton] = useState(false);

  const handleCameraChanged = useCallback(
    (latitude: number, longitude: number, zoom: number) => {
      const latChanged = Math.abs(latitude - camera.latitude) > 0.001;
      const lngChanged = Math.abs(longitude - camera.longitude) > 0.001;
      const zoomChanged =
        zoom !== undefined && Math.abs(zoom - camera.zoom) > 0.5;

      if (latChanged || lngChanged || zoomChanged) {
        setCamera({ latitude, longitude, zoom });
        setShowSearchButton(true);
      }
    },
    [camera],
  );

  const hideSearchButton = useCallback(() => {
    setShowSearchButton(false);
  }, []);

  return {
    camera,
    showSearchButton,
    handleCameraChanged,
    hideSearchButton,
    INITIAL_CAMERA,
  };
};

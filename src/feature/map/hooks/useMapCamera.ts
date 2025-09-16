import { useCallback, useRef, useState } from 'react';

import { Camera, Region } from '@mj-studio/react-native-naver-map';

interface MapCamera {
  latitude: number;
  longitude: number;
  zoom: number;
}

// 이후 유저 위치 동의 받는 시점에 기본값 세팅 삭제
export const INITIAL_CAMERA: MapCamera = {
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

  const hasInitialIdle = useRef(false);
  const isFirstCameraIdle = useCallback(() => !hasInitialIdle.current, []);
  const markInitialIdleHandled = useCallback(() => {
    hasInitialIdle.current = true;
  }, []);

  const handleMapIdle = useCallback(
    (
      navCamera: Camera & { region: Region },
      onAfterIdle?: (isFirst: boolean) => void,
    ) => {
      const { latitude, longitude, zoom } = navCamera;

      handleCameraChanged(latitude, longitude, zoom ?? INITIAL_CAMERA.zoom);

      const first = isFirstCameraIdle();
      if (first) {
        markInitialIdleHandled();
      }

      if (onAfterIdle) {
        onAfterIdle(first);
      }
    },
    [handleCameraChanged, isFirstCameraIdle, markInitialIdleHandled],
  );

  return {
    camera,
    showSearchButton,
    handleCameraChanged,
    hideSearchButton,
    handleMapIdle,
    INITIAL_CAMERA,
  };
};

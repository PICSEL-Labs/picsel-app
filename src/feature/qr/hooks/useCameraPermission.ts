import { useEffect, useState } from 'react';

import { Camera } from 'react-native-vision-camera';

export const useCameraPermission = () => {
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setPermission(status === 'granted');
    })();
  }, []);

  return permission;
};

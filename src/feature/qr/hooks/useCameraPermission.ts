import { useEffect, useState } from 'react';

import { requestCameraPermissionWithModal } from '@/shared/lib/cameraPermission';

export const useCameraPermission = () => {
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const granted = await requestCameraPermissionWithModal();
      setPermission(granted);
    })();
  }, []);

  return permission;
};

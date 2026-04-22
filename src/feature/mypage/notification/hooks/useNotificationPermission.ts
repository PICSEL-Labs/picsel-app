import { useCallback, useEffect, useRef, useState } from 'react';

import { AppState } from 'react-native';
import { checkNotifications, RESULTS } from 'react-native-permissions';

export const useNotificationPermission = () => {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const appStateRef = useRef(AppState.currentState);

  const checkPermission = useCallback(async (): Promise<boolean> => {
    try {
      const { status } = await checkNotifications();
      const granted = status === RESULTS.GRANTED;
      setIsPermissionGranted(granted);
      return granted;
    } catch (error) {
      console.error('Notification permission check error:', error);
      return false;
    }
  }, []);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        checkPermission();
      }
      appStateRef.current = nextAppState;
    });

    return () => subscription.remove();
  }, [checkPermission]);

  return { isPermissionGranted, checkPermission };
};

import { useCallback } from 'react';

import Geolocation from '@react-native-community/geolocation';
import { Alert, Linking, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import {
  GEOLOCATION_OPTIONS,
  LOCATION_ALERT,
} from '../constants/locationConfig';

const showLocationPermissionAlert = () => {
  Alert.alert(LOCATION_ALERT.TITLE, LOCATION_ALERT.MESSAGE, [
    { text: LOCATION_ALERT.CANCEL_TEXT, style: 'cancel' },
    {
      text: LOCATION_ALERT.CONFIRM_TEXT,
      onPress: () => Linking.openSettings(),
    },
  ]);
};

export const useLocationPermission = () => {
  const requestLocationPermission = useCallback(async (): Promise<boolean> => {
    try {
      const permission = Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      });

      if (!permission) {
        return false;
      }

      const result = await check(permission);

      switch (result) {
        case RESULTS.GRANTED:
          return true;
        case RESULTS.DENIED: {
          const requestResult = await request(permission);
          return requestResult === RESULTS.GRANTED;
        }
        default:
          return false;
      }
    } catch (error) {
      console.error('Permission error:', error);
      return false;
    }
  }, []);

  const getCurrentLocation = useCallback(async (): Promise<{
    latitude: number;
    longitude: number;
  } | null> => {
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      showLocationPermissionAlert();

      return null;
    }

    return new Promise(resolve => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        error => {
          console.error('Location error:', error);
          resolve(null);
        },
        GEOLOCATION_OPTIONS,
      );
    });
  }, [requestLocationPermission]);

  return {
    requestLocationPermission,
    getCurrentLocation,
  };
};

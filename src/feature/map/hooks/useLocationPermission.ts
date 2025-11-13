import { useCallback } from 'react';

import Geolocation from '@react-native-community/geolocation';
import { Alert, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

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
      Alert.alert(
        '위치 권한 거절',
        '내주변 가까운 매장을 찾기 위해 위치 권한이 필요해요. 설정에서 위치 권한을 허용해주세요.',
      );
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
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    });
  }, [requestLocationPermission]);

  return {
    requestLocationPermission,
    getCurrentLocation,
  };
};

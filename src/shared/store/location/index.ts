import Geolocation from '@react-native-community/geolocation';
import { create } from 'zustand';

interface Coordinates {
  latitude: number;
  longitude: number;
  zoom: number;
}

interface LocationState {
  userLocation: Coordinates | null; // 실제 GPS 기반 유저 위치
  searchLocation: Coordinates | null; // 검색/카메라 이동용 위치
  setUserLocation: (coords: Coordinates) => void;
  setSearchLocation: (coords: Coordinates) => void;
  resetSearchLocation: () => void;
  fetchUserLocation: () => Promise<void>;
}

export const useLocationStore = create<LocationState>(set => ({
  userLocation: null,
  searchLocation: null,

  setUserLocation: coords => set({ userLocation: coords }),

  setSearchLocation: coords => set({ searchLocation: coords }),

  resetSearchLocation: () => set({ searchLocation: null }),

  fetchUserLocation: async () => {
    return new Promise<void>((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;

          set({
            userLocation: {
              latitude,
              longitude,
              zoom: 15,
            },
          });

          resolve();
        },
        error => reject(error),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 10000,
        },
      );
    });
  },
}));

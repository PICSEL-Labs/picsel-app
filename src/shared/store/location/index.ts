import Geolocation from '@react-native-community/geolocation';
import { create } from 'zustand';

interface Coordinates {
  latitude: number;
  longitude: number;
  zoom: number;
}

interface LocationState {
  userLocation: Coordinates | null;
  setUserLocation: (coords: Coordinates) => void;
  fetchUserLocation: () => Promise<void>;
}

export const useLocationStore = create<LocationState>(set => ({
  userLocation: null,

  setUserLocation: coords => set({ userLocation: coords }),

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

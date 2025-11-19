import { create } from 'zustand';

interface MapLocationStore {
  targetLocation: {
    latitude: number;
    longitude: number;
    zoom: number;
  } | null;
  selectedStore: {
    id: string;
    kind: string;
    title: string;
    subtitle: string;
  } | null;
  isNavigatingToSearchResult: boolean;

  setTargetLocation: (
    location: MapLocationStore['targetLocation'],
    store: MapLocationStore['selectedStore'],
  ) => void;
  setNavigating: (isNavigating: boolean) => void;
  clearTarget: () => void;
}

export const useMapLocationStore = create<MapLocationStore>(set => ({
  targetLocation: null,
  selectedStore: null,
  isNavigatingToSearchResult: false,

  setTargetLocation: (location, store) =>
    set({
      targetLocation: location,
      selectedStore: store,
      isNavigatingToSearchResult: true,
    }),

  setNavigating: isNavigating =>
    set({
      isNavigatingToSearchResult: isNavigating,
    }),

  clearTarget: () =>
    set({
      targetLocation: null,
      selectedStore: null,
    }),
}));

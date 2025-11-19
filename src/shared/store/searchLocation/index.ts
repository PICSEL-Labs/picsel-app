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

  setTargetLocation: (
    location: MapLocationStore['targetLocation'],
    store: MapLocationStore['selectedStore'],
  ) => void;
  clearTarget: () => void;
}

export const useMapLocationStore = create<MapLocationStore>(set => ({
  targetLocation: null,
  selectedStore: null,

  setTargetLocation: (location, store) =>
    set({
      targetLocation: location,
      selectedStore: store,
    }),

  clearTarget: () =>
    set({
      targetLocation: null,
      selectedStore: null,
    }),
}));

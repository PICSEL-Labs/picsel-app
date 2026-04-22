import { create } from 'zustand';

type MapMode = 'default' | 'search';

interface MapLocationStore {
  targetLocation: {
    latitude: number;
    longitude: number;
    zoom: number;
  } | null;
  searchedStore: {
    id: string;
    kind: string;
    title: string;
    subtitle: string;
  } | null;
  selectedStoreId: string | null;
  mapMode: MapMode;
  keepSearchedMarker: boolean;

  setTargetLocation: (
    location: MapLocationStore['targetLocation'],
    store: MapLocationStore['searchedStore'],
    storeId?: string | null,
  ) => void;
  setMapMode: (mode: MapMode) => void;
  setKeepSearchedMarker: (keep: boolean) => void;
  resetToDefault: () => void;
}

export const useMapLocationStore = create<MapLocationStore>(set => ({
  targetLocation: null,
  searchedStore: null,
  selectedStoreId: null,
  mapMode: 'default',
  keepSearchedMarker: false,

  setTargetLocation: (location, store, storeId = null) =>
    set({
      targetLocation: location,
      searchedStore: store,
      selectedStoreId: storeId,
      mapMode: 'search',
      keepSearchedMarker: false,
    }),

  setMapMode: mode =>
    set({
      mapMode: mode,
    }),

  setKeepSearchedMarker: keep =>
    set({
      keepSearchedMarker: keep,
    }),

  resetToDefault: () =>
    set({
      targetLocation: null,
      searchedStore: null,
      selectedStoreId: null,
      mapMode: 'default',
      keepSearchedMarker: false,
    }),
}));

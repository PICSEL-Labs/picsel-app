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
  isNavigatingToSearchResult: boolean;
  mapMode: MapMode;

  setTargetLocation: (
    location: MapLocationStore['targetLocation'],
    store: MapLocationStore['searchedStore'],
    storeId?: string | null,
  ) => void;
  setNavigating: (isNavigating: boolean) => void;
  setMapMode: (mode: MapMode) => void;
  clearTarget: () => void;
  resetToDefault: () => void;
}

export const useMapLocationStore = create<MapLocationStore>(set => ({
  targetLocation: null,
  searchedStore: null,
  selectedStoreId: null,
  isNavigatingToSearchResult: false,
  mapMode: 'default',

  setTargetLocation: (location, store, storeId = null) =>
    set({
      targetLocation: location,
      searchedStore: store,
      selectedStoreId: storeId,
      isNavigatingToSearchResult: true,
      mapMode: 'search',
    }),

  setNavigating: isNavigating =>
    set({
      isNavigatingToSearchResult: isNavigating,
    }),

  setMapMode: mode =>
    set({
      mapMode: mode,
    }),

  clearTarget: () =>
    set({
      targetLocation: null,
      searchedStore: null,
      selectedStoreId: null,
      isNavigatingToSearchResult: false,
    }),

  resetToDefault: () =>
    set({
      targetLocation: null,
      searchedStore: null,
      selectedStoreId: null,
      isNavigatingToSearchResult: false,
      mapMode: 'default',
    }),
}));

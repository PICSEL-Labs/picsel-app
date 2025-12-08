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
  selectedStoreId: string | null;
  isNavigatingToSearchResult: boolean;

  setTargetLocation: (
    location: MapLocationStore['targetLocation'],
    store: MapLocationStore['selectedStore'],
    storeId?: string | null, // 추가
  ) => void;
  setNavigating: (isNavigating: boolean) => void;
  clearTarget: () => void;
}

export const useMapLocationStore = create<MapLocationStore>(set => ({
  targetLocation: null,
  selectedStore: null,
  selectedStoreId: null,
  isNavigatingToSearchResult: false,

  setTargetLocation: (location, store, storeId = null) =>
    set({
      targetLocation: location,
      selectedStore: store,
      selectedStoreId: storeId,
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
      selectedStoreId: null,
      isNavigatingToSearchResult: false,
    }),
}));

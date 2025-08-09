import React from 'react';

import { NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';

import DefaultMarker from '@/feature/map/ui/organisms/DefaultMarker';

interface Store {
  storeId: string;
  storeName: string;
  brandIconImageUrl: string;
  x: number;
  y: number;
}

interface MapOverlayProps {
  stores?: Store[];
}

export const MapOverlay = ({ stores }: MapOverlayProps) => {
  return (
    <>
      {stores?.map(store => {
        // console.log('🧭 store:', store.storeName, store.y, store.x);
        return (
          <NaverMapMarkerOverlay
            key={store.storeId}
            latitude={store.y}
            longitude={store.x}>
            <DefaultMarker brandIconImageUrl={store.brandIconImageUrl} />
          </NaverMapMarkerOverlay>
        );
      })}
    </>
  );
};

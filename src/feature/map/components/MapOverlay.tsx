import React, { useEffect, useState } from 'react';

import { NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';
import { Image } from 'react-native';
import Config from 'react-native-config';

import { useMarker } from '../hooks/useMarker';
import { Store } from '../types';
import DefaultMarker from '../ui/organisms/DefaultMarker';

interface Props {
  stores?: Store[];
}

const MapOverlay = ({ stores }: Props) => {
  const [shouldRenderMarkers, setShouldRenderMarkers] = useState(false);
  const { handleMarkerPress, selectedMarkerId } = useMarker();

  useEffect(() => {
    if (stores?.length) {
      setShouldRenderMarkers(false);

      const preloadPromises = stores.map(store =>
        Image.prefetch(Config.IMAGE_URL + store.brandIconImageUrl),
      );

      Promise.all(preloadPromises)
        .then(() => {
          setTimeout(() => setShouldRenderMarkers(true), 100);
        })
        .catch(() => {
          setTimeout(() => setShouldRenderMarkers(true), 500);
        });
    }
  }, [stores]);

  if (!shouldRenderMarkers) {
    return null;
  }

  return (
    <>
      {stores?.map(store => {
        const isSelected = selectedMarkerId === store.storeId;

        return (
          <NaverMapMarkerOverlay
            key={store.storeId}
            latitude={store.y}
            longitude={store.x}
            onTap={() => handleMarkerPress(store.storeId)}>
            <DefaultMarker
              selected={isSelected}
              brandIconImageUrl={store.brandIconImageUrl}
            />
          </NaverMapMarkerOverlay>
        );
      })}
    </>
  );
};

export default MapOverlay;

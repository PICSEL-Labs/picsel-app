import React, { useState } from 'react';

import { NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';

import { Store } from '../types';
import DefaultMarker from '../ui/organisms/DefaultMarker';

interface Props {
  stores?: Store[];
}

export const MapOverlay = ({ stores }: Props) => {
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

  const handleMarkerPress = (storeId: string) => {
    setSelectedMarkerId(prev => (prev === storeId ? null : storeId));
  };

  return (
    <>
      {stores?.map(store => {
        const isSelected = selectedMarkerId === store.storeId;

        console.log(isSelected);

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

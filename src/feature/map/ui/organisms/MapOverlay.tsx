import React, { useMemo } from 'react';

import { NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';
import Config from 'react-native-config';

import { Store } from '../../types';
import StoreMarker from '../atoms/StoreMarker';

interface Props {
  stores?: Store[];
  selectedMarkerId: string | null;
  handleMarkerPress: (storeId: string) => void;
}

const MapOverlay = ({ stores, selectedMarkerId, handleMarkerPress }: Props) => {
  const markers = useMemo(() => {
    return stores?.map(store => {
      const imageSource = {
        uri: `${Config.IMAGE_URL}${store.brandIconImageUrl}?w=50&h=50`,
      };

      return (
        <NaverMapMarkerOverlay
          key={`${store.storeId}-${selectedMarkerId === store.storeId}`}
          latitude={store.y}
          longitude={store.x}
          onTap={() => handleMarkerPress(store.storeId)}>
          <StoreMarker
            imageSource={imageSource}
            isSelected={selectedMarkerId === store.storeId}
          />
        </NaverMapMarkerOverlay>
      );
    });
  }, [stores, selectedMarkerId]);

  return <>{markers}</>;
};

export default MapOverlay;

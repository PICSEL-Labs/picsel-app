import React from 'react';

import { NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';
import Config from 'react-native-config';

import { Store } from '../../types';
import DefaultMarker from '../atoms/DefaultMarker';
import SelectedStoreMarker from '../atoms/SelectedStoreMarker';

interface Props {
  stores?: Store[];
  selectedMarkerId: string | null;
  handleMarkerPress: (storeId: string) => void;
}

const MapOverlay = ({ stores, selectedMarkerId, handleMarkerPress }: Props) => {
  return (
    <>
      {stores?.map(store => {
        const imageSource = {
          uri: Config.IMAGE_URL + store.brandIconImageUrl,
        };

        return (
          <NaverMapMarkerOverlay
            key={store.storeId}
            latitude={store.y}
            longitude={store.x}
            onTap={() => handleMarkerPress(store.storeId)}>
            {selectedMarkerId === store.storeId ? (
              <SelectedStoreMarker imageSource={imageSource} />
            ) : (
              <DefaultMarker imageSource={imageSource} />
            )}
          </NaverMapMarkerOverlay>
        );
      })}
    </>
  );
};

export default MapOverlay;

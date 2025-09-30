import React, { useMemo } from 'react';

import { NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';
import Config from 'react-native-config';

import { BrandData, StoreData } from '../../types';
import StoreMarker from '../atoms/StoreMarker';

interface Props {
  store: StoreData[];
  brand: BrandData[];
  selectedMarkerId: string | null;
  handleMarkerPress: (storeId: string) => void;
}

const MapOverlay = ({
  brand,
  store,
  selectedMarkerId,
  handleMarkerPress,
}: Props) => {
  const markers = useMemo(() => {
    return store?.map(data => {
      const matchedBrand = brand.find(b => b.brandId === data.brandId);

      const imageSource = {
        uri: matchedBrand
          ? `${Config.IMAGE_URL}${matchedBrand.brandIconImageUrl}?w=50&h=50`
          : `${Config.IMAGE_URL}/img/brand/logo/default.jpg`,
      };

      return (
        <NaverMapMarkerOverlay
          key={`${data.storeId}-${selectedMarkerId === data.storeId}`}
          latitude={data.y}
          longitude={data.x}
          onTap={() => handleMarkerPress(data.storeId)}>
          <StoreMarker
            imageSource={imageSource}
            isSelected={selectedMarkerId === data.storeId}
          />
        </NaverMapMarkerOverlay>
      );
    });
  }, [store, brand, selectedMarkerId]);

  return <>{markers}</>;
};

export default MapOverlay;

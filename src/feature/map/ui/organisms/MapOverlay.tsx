import React, { useEffect, useMemo, useState } from 'react';

import { NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';
import Config from 'react-native-config';

import { BrandData, StoreData } from '../../types';
import StoreMarker from '../atoms/StoreMarker';

interface Props {
  store?: StoreData[];
  brand?: BrandData[];
  selectedMarkerId: string | null;
  handleMarkerPress: (storeId: string) => void;
}

const DEFAULT_IMAGE = `${Config.IMAGE_URL}/img/brand/logo/default.jpg`;

const MapOverlay = ({
  brand = [],
  store = [],
  selectedMarkerId,
  handleMarkerPress,
}: Props) => {
  const [renderTrigger, setRenderTrigger] = useState(0);

  const brandMap = useMemo(() => {
    return new Map(brand.map(b => [b.brandId, b.brandIconImageUrl]));
  }, [brand]);

  useEffect(() => {
    if (store.length > 0) {
      const timer = setTimeout(() => {
        setRenderTrigger(prev => prev + 1);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [store, brand]);

  const markers = useMemo(() => {
    if (!store.length) {
      return null;
    }

    return store.map(data => {
      const brandIconUrl = brandMap.get(data.brandId);
      const imageSource = {
        uri: brandIconUrl
          ? `${Config.IMAGE_URL}${brandIconUrl}?w=50&h=50`
          : DEFAULT_IMAGE,
      };
      const isSelected = selectedMarkerId === data.storeId;

      return (
        <NaverMapMarkerOverlay
          key={`${data.storeId}-${renderTrigger}`}
          latitude={data.y}
          longitude={data.x}
          onTap={() => handleMarkerPress(data.storeId)}
          anchor={{ x: 0.5, y: 0.5 }}>
          <StoreMarker imageSource={imageSource} isSelected={isSelected} />
        </NaverMapMarkerOverlay>
      );
    });
  }, [store, brandMap, selectedMarkerId, handleMarkerPress, renderTrigger]);

  return <>{markers}</>;
};

export default MapOverlay;

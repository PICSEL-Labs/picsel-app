import React, { useEffect, useMemo, useState } from 'react';

import { NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';

import { SelectedStore } from '../../hooks/useMarker';
import { BrandData, StoreData } from '../../types';
import StoreMarker from '../atoms/StoreMarker';

interface Props {
  store?: StoreData[];
  brand?: BrandData[];
  selectedMarkerId: string | null;
  handleMarkerPress: (store: SelectedStore) => void;
}

const MapOverlay = ({
  brand = [],
  store = [],
  selectedMarkerId,
  handleMarkerPress,
}: Props) => {
  const [renderTrigger, setRenderTrigger] = useState(0);

  const brandMap = useMemo(() => {
    return new Map(brand.map(b => [b.brandId, b]));
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
      const brandInfo = brandMap.get(data.brandId);
      const brandIconUrl = brandInfo?.brandIconImageUrl;

      const isSelected = selectedMarkerId === data.storeId;

      return (
        <NaverMapMarkerOverlay
          key={`${data.storeId}-${renderTrigger}`}
          latitude={data.y}
          longitude={data.x}
          onTap={() =>
            handleMarkerPress({
              storeId: data.storeId,
              storeName: data.storeName,
              brandName: brandInfo?.brandName || '알 수 없음',
              address: data.address,
              distance: data.distance,
              brandIconImageUrl: brandIconUrl,
            })
          }
          anchor={{ x: 0.5, y: 0.5 }}>
          <StoreMarker imageSource={brandIconUrl} isSelected={isSelected} />
        </NaverMapMarkerOverlay>
      );
    });
  }, [store, brandMap, selectedMarkerId, handleMarkerPress, renderTrigger]);

  return <>{markers}</>;
};

export default MapOverlay;

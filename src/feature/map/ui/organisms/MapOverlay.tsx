import React, { useEffect, useMemo, useState } from 'react';

import { NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';

import { BrandData, StoreData, StoreDetail } from '../../types';
import StoreMarker from '../atoms/StoreMarker';

import { useFavoriteStore } from '@/shared/store';

interface Props {
  store?: StoreData[];
  brand?: BrandData[];
  selectedMarkerId: string | null;
  handleMarkerPress: (store: StoreDetail) => void;
}

const MapOverlay = ({
  brand = [],
  store = [],
  selectedMarkerId,
  handleMarkerPress,
}: Props) => {
  const [renderTrigger, setRenderTrigger] = useState(0);
  const { optimisticFavorites } = useFavoriteStore();

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
      const isFavorite = optimisticFavorites[data.brandId] ?? false;

      return (
        <NaverMapMarkerOverlay
          key={`${data.storeId}-${isSelected ? 'selected' : 'unselected'}-${isFavorite ? 'fav' : 'unfav'}-${renderTrigger}`}
          latitude={data.y}
          longitude={data.x}
          onTap={() =>
            handleMarkerPress({
              storeId: data.storeId,
              storeName: data.storeName,
              brandId: data.brandId,
              brandName: brandInfo?.brandName || '알 수 없음',
              address: data.address,
              distance: data.distance,
              brandIconImageUrl: brandIconUrl,
            })
          }
          anchor={{ x: 0.5, y: 0.5 }}
          zIndex={isSelected ? 1000 : 0}>
          <StoreMarker
            imageSource={brandIconUrl}
            brandId={data.brandId}
            isSelected={isSelected}
          />
        </NaverMapMarkerOverlay>
      );
    });
  }, [
    store,
    brandMap,
    selectedMarkerId,
    handleMarkerPress,
    renderTrigger,
    optimisticFavorites,
  ]);

  return <>{markers}</>;
};

export default MapOverlay;

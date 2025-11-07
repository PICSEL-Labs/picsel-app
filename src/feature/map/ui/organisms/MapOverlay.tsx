import React, { useMemo } from 'react';

import { NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';
import Config from 'react-native-config';

import { BrandData, StoreData, StoreDetail } from '../../types';

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
  const { optimisticFavorites } = useFavoriteStore();

  const brandMap = useMemo(() => {
    return new Map(brand.map(b => [b.brandId, b]));
  }, [brand]);

  const markers = useMemo(() => {
    if (!store.length) {
      return null;
    }

    return store.map(data => {
      const brandInfo = brandMap.get(data.brandId);
      const brandIconUrl = brandInfo?.brandIconImageUrl;
      const isSelected = selectedMarkerId === data.storeId;
      const IMAGE_SIZE = isSelected ? 48 : 28;
      const imageUri = `${Config.IMAGE_URL}${brandIconUrl}`;

      return (
        <NaverMapMarkerOverlay
          key={data.storeId}
          latitude={data.y}
          longitude={data.x}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          image={{ httpUri: imageUri }}
          onTap={() =>
            handleMarkerPress({
              storeId: data.storeId,
              storeName: data.storeName,
              brandId: data.brandId,
              brandName: brandInfo?.brandName,
              address: data.address,
              distance: data.distance,
              brandIconImageUrl: brandIconUrl,
            })
          }
          anchor={{ x: 0.5, y: 1 }}
          zIndex={isSelected ? 1000 : 0}
        />
      );
    });
  }, [
    store,
    brandMap,
    selectedMarkerId,
    handleMarkerPress,
    optimisticFavorites,
  ]);

  return <>{markers}</>;
};

export default MapOverlay;

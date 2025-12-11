import React, { useMemo, useRef, useEffect } from 'react';

import { NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';
import Config from 'react-native-config';

import { BrandData, StoreData, StoreDetail } from '../../types';
import { getFavoriteImageUrl } from '../../utils/imageUtils';

import { useFavoriteStore, useMapLocationStore } from '@/shared/store';

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
  const { mapMode, searchedStore, selectedStoreId } = useMapLocationStore();

  const hasBeenSelectedRef = useRef(false);

  useEffect(() => {
    const isSearchMode = mapMode === 'search' && selectedStoreId;

    if (!isSearchMode) {
      hasBeenSelectedRef.current = false;
      return;
    }

    if (selectedMarkerId === selectedStoreId) {
      hasBeenSelectedRef.current = true;
    }
  }, [selectedMarkerId, selectedStoreId, mapMode]);

  const brandMap = useMemo(
    () => new Map(brand.map(b => [b.brandId, b])),
    [brand],
  );

  const isStoreSearchMode =
    mapMode === 'search' && searchedStore?.kind === 'store' && selectedStoreId;

  const getMarkerConfig = (
    data: StoreData,
    brandInfo: BrandData | undefined,
  ) => {
    const isSelected = selectedMarkerId === data.storeId;
    const isSearchedStore =
      isStoreSearchMode && data.storeId === selectedStoreId;
    const isFavorite =
      optimisticFavorites[data.brandId] ?? brandInfo?.isFavorite ?? false;
    const brandIconUrl = brandInfo?.brandIconImageUrl || '';

    // 검색된 스토어인 경우
    if (isSearchedStore) {
      const shouldShowBrandImage = isSelected || !hasBeenSelectedRef.current;

      if (shouldShowBrandImage) {
        const finalImageUrl = getFavoriteImageUrl(brandIconUrl, isFavorite);
        return {
          imageConfig: { httpUri: `${Config.IMAGE_URL}${finalImageUrl}` },
          size: 48,
          zIndex: 2000,
        };
      }

      return {
        imageConfig: { httpUri: `${Config.IMAGE_URL}/searched-marker.png` },
        size: 48,
        zIndex: 2000,
      };
    }

    // 일반 스토어인 경우
    const finalImageUrl = getFavoriteImageUrl(brandIconUrl, isFavorite);
    return {
      imageConfig: { httpUri: `${Config.IMAGE_URL}${finalImageUrl}` },
      size: isSelected ? 48 : 28,
      zIndex: isSelected ? 1000 : 0,
    };
  };

  const markers = useMemo(() => {
    if (!store.length) {
      return null;
    }

    return store.map(data => {
      const brandInfo = brandMap.get(data.brandId);
      const { imageConfig, size, zIndex } = getMarkerConfig(data, brandInfo);

      return (
        <NaverMapMarkerOverlay
          key={data.storeId}
          latitude={data.y}
          longitude={data.x}
          width={size}
          height={size}
          image={imageConfig}
          onTap={() =>
            handleMarkerPress({
              storeId: data.storeId,
              storeName: data.storeName,
              brandId: data.brandId,
              brandName: brandInfo?.brandName,
              address: data.address,
              distance: data.distance,
              brandIconImageUrl: brandInfo?.brandIconImageUrl,
            })
          }
          anchor={{ x: 0.5, y: 1 }}
          zIndex={zIndex}
        />
      );
    });
  }, [
    store,
    brandMap,
    selectedMarkerId,
    optimisticFavorites,
    isStoreSearchMode,
    selectedStoreId,
  ]);

  return <>{markers}</>;
};

export default MapOverlay;

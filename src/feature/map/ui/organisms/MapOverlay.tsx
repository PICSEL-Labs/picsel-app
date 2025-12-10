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

  const hasBeenDeselectedRef = useRef(false);

  useEffect(() => {
    if (selectedStoreId && selectedMarkerId !== selectedStoreId) {
      hasBeenDeselectedRef.current = true;
    }
    if (mapMode === 'default' || !selectedStoreId) {
      hasBeenDeselectedRef.current = false;
    }
  }, [selectedMarkerId, selectedStoreId, mapMode]);

  const brandMap = useMemo(() => {
    return new Map(brand.map(b => [b.brandId, b]));
  }, [brand]);

  const markers = useMemo(() => {
    if (!store.length) {
      return null;
    }

    const isStoreSearchMode =
      mapMode === 'search' &&
      searchedStore?.kind === 'store' &&
      selectedStoreId;

    return store.map(data => {
      const brandInfo = brandMap.get(data.brandId);
      const brandIconUrl = brandInfo?.brandIconImageUrl;

      const isSelected = selectedMarkerId === data.storeId;

      const isSearchedStore =
        isStoreSearchMode && data.storeId === selectedStoreId;

      const isFavorite =
        optimisticFavorites[data.brandId] ?? brandInfo?.isFavorite ?? false;

      let IMAGE_SIZE;
      let imageConfig;

      if (isSearchedStore) {
        const shouldShowBrandImage =
          isSelected || !hasBeenDeselectedRef.current;

        if (shouldShowBrandImage) {
          const finalImageUrl = getFavoriteImageUrl(
            brandIconUrl || '',
            isFavorite,
          );
          imageConfig = { httpUri: `${Config.IMAGE_URL}${finalImageUrl}` };
          IMAGE_SIZE = 48;
        } else {
          // 검색 이미지 -> 서버에서 제공 받기 -> 디자인 서버 요청
          imageConfig = {
            httpUri: `${Config.IMAGE_URL}/searched-marker.png`,
          };
          IMAGE_SIZE = 48;
        }
      } else {
        const finalImageUrl = getFavoriteImageUrl(
          brandIconUrl || '',
          isFavorite,
        );
        imageConfig = { httpUri: `${Config.IMAGE_URL}${finalImageUrl}` };
        IMAGE_SIZE = isSelected ? 48 : 28;
      }

      return (
        <NaverMapMarkerOverlay
          key={data.storeId}
          latitude={data.y}
          longitude={data.x}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          image={imageConfig}
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
          zIndex={isSearchedStore ? 2000 : isSelected ? 1000 : 0}
        />
      );
    });
  }, [
    store,
    brandMap,
    selectedMarkerId,
    handleMarkerPress,
    optimisticFavorites,
    mapMode,
    searchedStore,
    selectedStoreId,
  ]);

  return <>{markers}</>;
};

export default MapOverlay;

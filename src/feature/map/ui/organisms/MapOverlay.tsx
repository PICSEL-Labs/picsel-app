import React, {
  useMemo,
  useEffect,
  memo,
  useState,
  useRef,
  useCallback,
} from 'react';

import { NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';
import Config from 'react-native-config';

import { BrandData, StoreData, StoreDetail } from '../../types';
import { getFavoriteImageUrl } from '../../utils/imageUtils';

import { useFavoriteStore, useMapLocationStore } from '@/shared/store';

interface Props {
  store?: StoreData[];
  brand?: BrandData[];
  selectedMarkerId: string | null;
  handleMarkerPress: (store: StoreDetail, isFromSearch?: boolean) => void;
}

const MapOverlay = memo(
  ({ brand = [], store = [], selectedMarkerId, handleMarkerPress }: Props) => {
    const { optimisticFavorites, syncFavorite } = useFavoriteStore();
    const { mapMode, searchedStore, selectedStoreId, keepSearchedMarker } =
      useMapLocationStore();
    const [hasBeenSelected, setHasBeenSelected] = useState(false);

    useEffect(() => {
      if (brand.length > 0) {
        brand.forEach(b => {
          if (optimisticFavorites[b.brandId] === undefined) {
            syncFavorite(b.brandId, b.isFavorite);
          }
        });
      }
    }, [brand, optimisticFavorites, syncFavorite]);

    useEffect(() => {
      const isSearchMode = mapMode === 'search' && selectedStoreId;

      if (!isSearchMode) {
        setHasBeenSelected(false);
        return;
      }

      if (selectedMarkerId === selectedStoreId) {
        setHasBeenSelected(true);
      }
    }, [selectedMarkerId, selectedStoreId, mapMode]);

    const brandMap = useMemo(
      () => new Map(brand.map(b => [b.brandId, b])),
      [brand],
    );

    const isStoreSearchMode =
      mapMode === 'search' &&
      searchedStore?.kind === 'store' &&
      selectedStoreId !== null;

    const lastTapTimeRef = useRef(0);

    const handleMarkerTap = useCallback(
      (storeDetail: StoreDetail, isFromSearch: boolean) => {
        const now = Date.now();

        if (now - lastTapTimeRef.current < 300) {
          return;
        }

        lastTapTimeRef.current = now;
        handleMarkerPress(storeDetail, isFromSearch);
      },
      [handleMarkerPress],
    );

    const markers = useMemo(() => {
      if (!store.length) {
        return null;
      }

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
        const shouldShowBrandImage =
          isSelected || (!hasBeenSelected && !keepSearchedMarker);

        if (isSearchedStore) {
          if (shouldShowBrandImage) {
            const finalImageUrl = getFavoriteImageUrl(brandIconUrl, isFavorite);
            return {
              imageConfig: { httpUri: `${Config.IMAGE_URL}${finalImageUrl}` },
              size: 48,
              zIndex: 2000,
            };
          }

          return {
            imageConfig: {
              httpUri: `${Config.IMAGE_URL}/common/search-marker.png`,
            },
            size: 22,
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
              handleMarkerTap(
                {
                  storeId: data.storeId,
                  storeName: data.storeName,
                  brandId: data.brandId,
                  brandName: brandInfo?.brandName,
                  address: data.address,
                  distance: data.distance,
                  brandIconImageUrl: brandInfo?.brandIconImageUrl,
                },
                isStoreSearchMode,
              )
            }
            anchor={{ x: 0.5, y: 1 }}
            zIndex={zIndex}
          />
        );
      });
    }, [
      store,
      brandMap,
      brand,
      selectedMarkerId,
      handleMarkerPress,
      optimisticFavorites,
      isStoreSearchMode,
      selectedStoreId,
      hasBeenSelected,
      keepSearchedMarker,
      handleMarkerTap,
    ]);

    return <>{markers}</>;
  },
);

export default MapOverlay;

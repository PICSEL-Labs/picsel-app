import { useCallback, useMemo, useState } from 'react';

import { MAP_SEARCH_CONFIG } from '@/feature/map/constants/mapConfig';
import { StoreSearchParams } from '@/feature/map/types';

export const useMapSearch = () => {
  const [storeParams, setStoreParams] = useState<StoreSearchParams>({
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0,
    centerX: 0,
    centerY: 0,
    page: 0,
    size: 0,
  });

  const getOffsetByZoom = useMemo(
    () => (zoom: number) => {
      const { ZOOM_OFFSETS } = MAP_SEARCH_CONFIG;

      if (zoom >= 18) {
        return ZOOM_OFFSETS[18];
      }
      if (zoom >= 16) {
        return ZOOM_OFFSETS[16];
      }
      if (zoom >= 14) {
        return ZOOM_OFFSETS[14];
      }
      return ZOOM_OFFSETS.DEFAULT;
    },
    [],
  );

  const getLimitedOffsetByZoom = useCallback(
    (zoom: number) => {
      const offset = getOffsetByZoom(zoom);
      return Math.min(offset, MAP_SEARCH_CONFIG.MAX_OFFSET);
    },
    [getOffsetByZoom],
  );

  const searchStoresByLocation = useCallback(
    (latitude: number, longitude: number, zoom: number) => {
      const isZoomTooWide = zoom < MAP_SEARCH_CONFIG.MIN_ZOOM_LEVEL;
      const offset = isZoomTooWide
        ? MAP_SEARCH_CONFIG.MAX_OFFSET
        : getLimitedOffsetByZoom(zoom);

      const newParams: StoreSearchParams = {
        minX: longitude - offset,
        maxX: longitude + offset,
        minY: latitude - offset,
        maxY: latitude + offset,
        centerX: longitude,
        centerY: latitude,
        page: 0,
        size: MAP_SEARCH_CONFIG.DEFAULT_PAGE_SIZE,
      };

      setStoreParams(newParams);
    },
    [getLimitedOffsetByZoom],
  );

  return {
    storeParams,
    searchStoresByLocation,
  };
};

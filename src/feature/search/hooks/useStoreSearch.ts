import { useMemo } from 'react';

import { useSearchAutocomplete } from '@/feature/search/queries/useSearchAutoComplete';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';
import { useLocationStore } from '@/shared/store';

type UIState = 'hasResults' | 'noResults';

interface Props {
  minLen?: number;
  debounceMs?: number;
  radius?: number;
  latitude?: number;
  longitude?: number;
}

export const useStoreSearch = (query: string, props: Props = {}) => {
  const { userLocation } = useLocationStore();

  const {
    minLen = 2, // 최소 2글자로 요청
    debounceMs = 400, // 0.4초로 디바운스
    radius = 999, // 임시 반경값
    latitude = userLocation.latitude,
    longitude = userLocation.longitude,
  } = props;

  const debouncedQuery = useDebouncedValue(query, debounceMs);

  const safeQuery = useMemo(() => {
    const trimmed = (debouncedQuery ?? '').trim();
    return trimmed;
  }, [debouncedQuery]);

  const hasQuery = useMemo(() => {
    const has = safeQuery.length >= minLen;
    return has;
  }, [safeQuery, minLen]);

  const { data: result, isFetching } = useSearchAutocomplete(
    {
      query: safeQuery,
      latitude,
      longitude,
      radius,
    },
    hasQuery,
  );

  const counts = useMemo(() => {
    if (!result) {
      return { stations: 0, stores: 0, administrativeDistricts: 0 };
    }

    return {
      stations: result.stations?.length ?? 0,
      stores: result.stores?.length ?? 0,
      administrativeDistricts: result.administrativeDistricts?.length ?? 0,
    };
  }, [result]);

  const hasResults = useMemo(
    () => counts.stations + counts.stores + counts.administrativeDistricts > 0,
    [counts],
  );

  const uiState: UIState | undefined = useMemo(() => {
    if (!hasQuery || isFetching) {
      return undefined;
    }
    return hasResults ? 'hasResults' : 'noResults';
  }, [hasQuery, isFetching, hasResults]);

  return {
    debouncedQuery,
    hasQuery,
    result,
    isFetching,
    hasResults,
    uiState,
    counts,
  };
};

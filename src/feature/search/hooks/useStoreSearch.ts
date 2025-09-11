import { useMemo } from 'react';

import { useSearchAutocomplete } from '@/feature/search/queries/useSearchAutoComplete';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';

type UIState = 'hasResults' | 'noResults';

const DEFAULT_COORDS = { latitude: 37.5666102, longitude: 126.9783881 };

interface Props {
  minLen?: number;
  debounceMs?: number;
  radius?: number;
  latitude?: number;
  longitude?: number;
}

export const useStoreSearch = (query: string, props: Props = {}) => {
  const {
    minLen = 2, // 최소 2글자로 요청
    debounceMs = 400, // 0.4초로 디바운스
    radius = 999, // 임시 반경값
    latitude = DEFAULT_COORDS.latitude,
    longitude = DEFAULT_COORDS.longitude,
  } = props;

  const debouncedQuery = useDebouncedValue(query, debounceMs);
  const hasQuery = debouncedQuery.trim().length >= minLen;

  const { data: result, isFetching } = useSearchAutocomplete(
    {
      query: debouncedQuery,
      latitude,
      longitude,
      radius,
    },
    hasQuery,
  );

  const counts = useMemo(
    () => ({
      stations: result?.stations?.length ?? 0,
      stores: result?.stores?.length ?? 0,
      administrativeDistricts: result?.administrativeDistricts?.length ?? 0,
    }),
    [result],
  );

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

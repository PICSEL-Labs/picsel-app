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
    minLen = 2,
    debounceMs = 400,
    radius = 999,
    latitude = DEFAULT_COORDS.latitude,
    longitude = DEFAULT_COORDS.longitude,
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

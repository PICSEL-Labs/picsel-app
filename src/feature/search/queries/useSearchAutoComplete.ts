import { useQuery } from '@tanstack/react-query';

import { searchAutocompleteApi } from '../api/searchAutoCompleteApi';
import { AcSearchParams, AcSearchResult } from '../types';

export const useSearchAutocomplete = (
  params: AcSearchParams,
  enabled: boolean,
) => {
  const { query, latitude, longitude, radius } = params;

  return useQuery<AcSearchResult>({
    queryKey: ['autocomplete', query.trim(), latitude, longitude, radius],
    queryFn: () => searchAutocompleteApi(params),
    enabled,
    staleTime: 1000 * 60,
    retry: 1,
  });
};

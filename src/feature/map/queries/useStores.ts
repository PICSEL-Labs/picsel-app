import { useQuery } from '@tanstack/react-query';

import { fetchStores } from '../api/fetchStores';
import { StoreSearchParams } from '../types';

export const useStores = (params: StoreSearchParams) => {
  return useQuery({
    queryKey: ['stores', params],
    queryFn: () => fetchStores(params),
    enabled: !!params.minX && !!params.minY,
    staleTime: 1000 * 60,
    retry: 2,
  });
};

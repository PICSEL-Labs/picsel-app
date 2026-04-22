import { useQuery } from '@tanstack/react-query';

import { fetchStores } from '../api/fetchStoresApi';
import { StoreSearchParams } from '../types';

export const useFetchStores = (params: StoreSearchParams) => {
  return useQuery({
    queryKey: ['stores', params],
    queryFn: () => fetchStores(params),
    enabled: !!params.minX && !!params.minY && !!params.userX && !!params.userY,
    staleTime: 1000 * 30,
    retry: 2,
  });
};

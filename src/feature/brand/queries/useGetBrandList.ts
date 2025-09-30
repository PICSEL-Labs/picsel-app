import { useQuery } from '@tanstack/react-query';

import { getBrandsListApi } from '../api/getBrandListApi';
import { Brand } from '../types';

import { QUERY_KEYS } from '@/shared/constants/query/key';

export const useGetBrandsList = () => {
  return useQuery<Brand[]>({
    queryKey: QUERY_KEYS.BRANDS,
    queryFn: getBrandsListApi,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
};

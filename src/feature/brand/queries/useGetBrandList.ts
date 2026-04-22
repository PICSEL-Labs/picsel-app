import { useQuery } from '@tanstack/react-query';

import { getBrandsListApi } from '../api/getBrandListApi';
import { Brand } from '../types';

export const useGetBrandsList = () => {
  return useQuery<Brand[]>({
    queryKey: ['brands'],
    queryFn: getBrandsListApi,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
};

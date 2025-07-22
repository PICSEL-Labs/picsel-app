import { useQuery } from '@tanstack/react-query';

import { getBrandsListApi } from '../api/getBrandListApi';
import { Brand } from '../types/brandType';

export const useGetBrandsList = () => {
  return useQuery<Brand[]>({
    queryKey: ['brands'],
    queryFn: getBrandsListApi,
  });
};

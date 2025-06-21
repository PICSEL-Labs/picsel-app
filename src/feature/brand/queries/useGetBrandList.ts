import { useQuery } from '@tanstack/react-query';

import { getBrandsListApi } from '../api/getBrandListApi';

export const useGetBrandsList = () => {
  const queryKey = ['brands'];

  const queryFn = async () => {
    const result = await getBrandsListApi();
    return result;
  };

  return useQuery({
    queryKey,
    queryFn,
  });
};

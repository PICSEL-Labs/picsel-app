import { StoreSearchParams, StoreSearchResponse } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';

export const fetchStores = async (
  params: StoreSearchParams,
): Promise<StoreSearchResponse> => {
  const response = await axiosInstance.get<StoreSearchResponse>(
    '/stores/search',
    {
      params,
    },
  );

  return response.data;
};

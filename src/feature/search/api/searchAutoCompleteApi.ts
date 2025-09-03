import { AcSearchParams, AcSearchResponse, AcSearchResult } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';

export const searchAutocompleteApi = async (
  params: AcSearchParams,
): Promise<AcSearchResult> => {
  const response = await axiosInstance.get<AcSearchResponse>('/ac/search', {
    params,
  });
  return response.data.data;
};

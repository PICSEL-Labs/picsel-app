import { BrandsResponse } from '../types/brandType';

import { axiosInstance } from '@/shared/api/axiosInstance';

// 브랜드 리스트 fetch API
export const getBrandsListApi = async (): Promise<BrandsResponse['data']> => {
  const response = await axiosInstance.get<BrandsResponse>('/brands');
  return response.data.data;
};

import { BrandsResponse } from '../types/brandType';

import { axiosInstance } from '@/shared/api/axiosInstance';

export interface BrandSelectionRequest {
  brandIds: string[];
}

// 선호 브랜드 추가 API
export const favoriteBrandApi = async (
  body: BrandSelectionRequest,
): Promise<BrandsResponse> => {
  const response = await axiosInstance.put<BrandsResponse>(
    '/brands/favorites',
    body,
  );

  return response.data;
};

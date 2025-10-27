import { axiosInstance } from '@/shared/api/axiosInstance';
import { CommonResponseType } from '@/shared/api/types';

export interface BrandFavToggleRequest {
  brandId: string;
  action: 'ADD' | 'REMOVE';
}

export const toggleFavoriteBrandApi = async (body: BrandFavToggleRequest) => {
  const response = await axiosInstance.post<CommonResponseType>(
    '/brands/favorites',
    body,
  );

  return response.data;
};

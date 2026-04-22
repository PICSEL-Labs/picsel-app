import { getPicselDetailResponse, PicselDetailResponse } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';

export const getPicselDetailApi = async (
  picselId: string,
): Promise<PicselDetailResponse> => {
  const response = await axiosInstance.get<getPicselDetailResponse>(
    `/picsels/${picselId}`,
  );
  return response.data.data;
};

import { PicselUploadRequest, PicselUploadResponse } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';

export const addPicselToPicselBookApi = async (
  body: PicselUploadRequest,
): Promise<PicselUploadResponse> => {
  const response = await axiosInstance.post<PicselUploadResponse>(
    '/picsels',
    body,
  );

  return response.data;
};

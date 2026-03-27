import { PatchPicselBookRequest, PatchPicselBookResponse } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';

export const patchPicselBookApi = async (
  picselbookId: string,
  body: PatchPicselBookRequest,
): Promise<PatchPicselBookResponse> => {
  const response = await axiosInstance.patch<PatchPicselBookResponse>(
    `/picselbooks/${picselbookId}`,
    body,
  );

  return response.data;
};

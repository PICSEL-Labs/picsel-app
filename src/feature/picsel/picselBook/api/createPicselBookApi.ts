import { CreatePicselBookRequest, CreatePicselbookResponse } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';

export const createPicselBookApi = async (
  body: CreatePicselBookRequest,
): Promise<CreatePicselbookResponse> => {
  const response = await axiosInstance.post<CreatePicselbookResponse>(
    '/picselbooks',
    body,
  );

  return response.data;
};

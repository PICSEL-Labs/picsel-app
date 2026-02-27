import { CreatePicselDraftResponse } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';

export const createPicselDraftApi = async (
  picselbookId: string,
): Promise<CreatePicselDraftResponse> => {
  const response = await axiosInstance.post<CreatePicselDraftResponse>(
    '/picsels/draft',
    undefined,
    {
      params: {
        picselbookId,
      },
    },
  );

  return response.data;
};

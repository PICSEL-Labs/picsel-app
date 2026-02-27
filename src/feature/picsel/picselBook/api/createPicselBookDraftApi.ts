import { CreatePicselBookDraftResponse } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';

export const createPicselBookDraftApi =
  async (): Promise<CreatePicselBookDraftResponse> => {
    const response =
      await axiosInstance.post<CreatePicselBookDraftResponse>(
        '/picselbooks/draft',
      );

    return response.data;
  };

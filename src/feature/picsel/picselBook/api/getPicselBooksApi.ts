import { PicselBookParams, PicselBookResult } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';
import { CommonResponseType } from '@/shared/api/types';

interface PicselBooksResponse extends CommonResponseType {
  data: PicselBookResult;
}

export const getPicselBooksApi = async (
  params: PicselBookParams = {},
): Promise<PicselBookResult> => {
  const { page = 0, size = 20, sort = 'RECENT_CREATED_DESC' } = params;

  const response = await axiosInstance.get<PicselBooksResponse>(
    '/picselbooks',
    {
      params: { page, size, sortType: sort },
    },
  );

  return response.data.data;
};

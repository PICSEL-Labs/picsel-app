import { PicselBookItem, PicselBookParams } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';
import { CommonResponseType } from '@/shared/api/types';

interface PicselBooksResponse extends CommonResponseType {
  data: PicselBookItem[];
}

export const getPicselBooksApi = async (
  params: PicselBookParams = {},
): Promise<PicselBookItem[]> => {
  const { sort = 'RECENT_CREATED_DESC' } = params;

  const response = await axiosInstance.get<PicselBooksResponse>(
    '/picselbooks',
    {
      params: { sortType: sort },
    },
  );

  return response.data.data;
};

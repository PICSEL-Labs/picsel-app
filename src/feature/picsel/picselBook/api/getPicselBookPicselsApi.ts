import { PicselBookFolderParams, PicselBookFolderResult } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';
import { CommonResponseType } from '@/shared/api/types';

interface PicselBookPicselsResponse extends CommonResponseType {
  data: PicselBookFolderResult;
}

export const getPicselBookPicselsApi = async (
  params: PicselBookFolderParams,
): Promise<PicselBookFolderResult> => {
  const {
    picselbookId,
    page = 0,
    size = 20,
    sortType = 'RECENT_DESC',
  } = params;

  const response = await axiosInstance.get<PicselBookPicselsResponse>(
    `/picselbooks/${picselbookId}/picsels`,
    {
      params: { page, size, sortType },
    },
  );

  if (__DEV__) {
    console.log('[API res] GET /picselbooks/{picselbookId}/picsels', {
      picselbookId,
      params: { page, size, sortType },
      status: response.status,
      data: response.data,
    });
  }

  return response.data.data;
};

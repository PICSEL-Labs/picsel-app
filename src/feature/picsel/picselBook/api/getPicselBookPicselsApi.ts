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

  return response.data.data;
};

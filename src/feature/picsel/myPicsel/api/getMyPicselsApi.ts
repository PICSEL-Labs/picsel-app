import { MyPicselParams, MyPicselResult } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';
import { CommonResponseType } from '@/shared/api/types';

interface MyPicselsResponse extends CommonResponseType {
  data: MyPicselResult;
}

export const getMyPicselsApi = async (
  params: MyPicselParams = {},
): Promise<MyPicselResult> => {
  const { page = 0, size = 20, sort = 'RECENT_DESC' } = params;

  const response = await axiosInstance.get<MyPicselsResponse>('/picsels/my', {
    params: { page, size, sort },
  });

  return response.data.data;
};

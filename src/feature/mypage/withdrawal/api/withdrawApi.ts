import { axiosInstance } from '@/shared/api/axiosInstance';
import { CommonResponseType } from '@/shared/api/types';

export const withdrawApi = async (): Promise<CommonResponseType> => {
  const response =
    await axiosInstance.delete<CommonResponseType>('/auth/withdraw');

  return response.data;
};

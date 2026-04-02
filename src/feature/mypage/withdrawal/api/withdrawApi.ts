import { axiosInstance } from '@/shared/api/axiosInstance';
import { CommonResponseType } from '@/shared/api/types';

export const withdrawApi = async (
  reason: string,
): Promise<CommonResponseType> => {
  const response = await axiosInstance.delete<CommonResponseType>(
    '/auth/withdraw',
    {
      data: { reason },
    },
  );

  return response.data;
};

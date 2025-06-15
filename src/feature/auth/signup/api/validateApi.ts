import { ValidateResponse } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';

// 사용자 아이디, 닉네임 유효성 검증 API
export const validateUserInfoApi = async (
  value: string,
): Promise<ValidateResponse> => {
  const response = await axiosInstance.get<ValidateResponse>(
    `/users/validate/nickname`,
    {
      params: { value },
    },
  );

  return response.data;
};

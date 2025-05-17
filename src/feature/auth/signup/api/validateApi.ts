import { ValidateResponse, ValidationType } from '../types';

import { axiosInstance } from '@/shared/lib/api/axiosInstance';

// 사용자 아이디, 닉네임 유효성 검증 API
export const validateUserInfoApi = async (
  type: ValidationType,
  value: string,
): Promise<ValidateResponse> => {
  const response = await axiosInstance.get<ValidateResponse>(
    `/users/validate/${type}`,
    {
      params: { value },
    },
  );

  return response.data;
};

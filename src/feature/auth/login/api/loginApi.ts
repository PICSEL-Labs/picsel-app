import { LoginRequest, LoginResponse } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';

export const loginApi = async ({
  socialAccessToken,
  socialType,
}: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>('/auth/signin', {
    socialAccessToken,
    socialType,
  });

  return response.data;
};

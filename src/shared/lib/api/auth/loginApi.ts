import { LoginRequest, LoginResponse } from '@/feature/auth/types';
import { axiosInstance } from '@/shared/lib/api';

// 로그인 API
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

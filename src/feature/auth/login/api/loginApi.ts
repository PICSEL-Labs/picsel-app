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

// TODO: 앱스토어 심사 완료 후 제거
export const testLoginApi = async (): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    '/auth/signin/appstore-test',
  );

  return response.data;
};

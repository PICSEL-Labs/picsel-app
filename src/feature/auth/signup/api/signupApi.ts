import { SignupRequest, SignupResponse } from '../types/types';

import { axiosInstance } from '@/shared/lib/api/axiosInstance';

// 회원가입 API
export const signupApi = async (
  body: SignupRequest,
): Promise<SignupResponse> => {
  console.log(body);
  const response = await axiosInstance.post<SignupResponse>(
    '/auth/signup',
    body,
  );

  return response.data;
};

import { axiosInstance } from '@/shared/api/axiosInstance';
import { CommonResponseType } from '@/shared/api/types';

export interface UserData {
  userNickname: string;
  email: string;
  socialType: string;
  createdAt: string;
}

interface GetUserResponse extends CommonResponseType {
  data: UserData;
}

export const getUserApi = async (): Promise<UserData> => {
  const response = await axiosInstance.get<GetUserResponse>('/users');

  return response.data.data;
};

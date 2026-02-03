import { axiosInstance } from '@/shared/api/axiosInstance';
import { CommonResponseType } from '@/shared/api/types';

interface ValidateNicknameResponse extends CommonResponseType {
  data: null;
}

export interface UpdateNicknameData {
  userNickname: string;
  email: string;
  socialType: string;
  createdAt: string;
}

export interface UpdateNicknameResponse extends CommonResponseType {
  data: UpdateNicknameData;
}

export const validateNicknameApi = async (
  value: string,
): Promise<ValidateNicknameResponse> => {
  const response = await axiosInstance.get<ValidateNicknameResponse>(
    '/users/validate/nickname',
    {
      params: { value },
    },
  );

  return response.data;
};

export const updateNicknameApi = async (
  nickname: string,
): Promise<UpdateNicknameResponse> => {
  const response = await axiosInstance.patch<UpdateNicknameResponse>(
    '/users/nickname',
    { nickname },
  );

  return response.data;
};

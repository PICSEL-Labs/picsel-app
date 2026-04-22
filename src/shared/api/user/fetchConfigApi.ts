import { axiosInstance } from '../axiosInstance';

import { UserConfigResponse } from './types';

export const fetchUserConfig = async () => {
  const response = await axiosInstance.get<UserConfigResponse>('/app/config');

  return response.data;
};

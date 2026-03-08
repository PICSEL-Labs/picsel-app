import { MovePicselsRequest, MovePicselsResponse } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';

export const movePicselsApi = async (
  request: MovePicselsRequest,
): Promise<MovePicselsResponse> => {
  const response = await axiosInstance.patch<MovePicselsResponse>(
    '/picsels/move',
    request,
  );

  return response.data;
};

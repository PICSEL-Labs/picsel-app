import { DeletePicselsRequest } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';

export const deletePicselsApi = async (
  request: DeletePicselsRequest,
): Promise<void> => {
  await axiosInstance.delete('/picsels', {
    data: request,
  });
};

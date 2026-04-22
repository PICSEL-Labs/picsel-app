import { DeletePicselBooksRequest } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';

export const deletePicselBooksApi = async (
  request: DeletePicselBooksRequest,
): Promise<void> => {
  await axiosInstance.delete('/picselbooks', {
    data: request,
  });
};

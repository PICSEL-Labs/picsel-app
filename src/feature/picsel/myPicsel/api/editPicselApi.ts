import {
  EditPicselRequest,
  EditPicselResponse,
  PicselDetailResponse,
} from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';

export const editPicselApi = async (
  picselId: string,
  request: EditPicselRequest,
): Promise<PicselDetailResponse> => {
  const response = await axiosInstance.patch<EditPicselResponse>(
    `/picsels/${picselId}`,
    request,
  );
  return response.data.data;
};

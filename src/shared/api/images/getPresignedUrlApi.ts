import { axiosInstance } from '../axiosInstance';

import { ImageType, PresignedUrlResponse } from './types';
/**
 * 이미지 업로드를 위한 Presigned URL 발급 API
 * @param uuid draftUuid
 * @param type 이미지 타입
 */
export const getPresignedUrlApi = async (uuid: string, type: ImageType) => {
  const response = await axiosInstance.get<PresignedUrlResponse>(
    '/images/presigned',
    {
      params: {
        uuid,
        type,
      },
    },
  );

  return response.data;
};

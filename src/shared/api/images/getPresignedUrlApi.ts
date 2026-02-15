import DeviceInfo from 'react-native-device-info';

import { axiosInstance } from '../axiosInstance';

import { ImageType, PresignedUrlResponse } from './types';

/**
 * 이미지 업로드를 위한 Presigned URL 발급 API
 * @param type 이미지 타입
 */
export const getPresignedUrlApi = async (type: ImageType) => {
  const deviceUUID = await DeviceInfo.getUniqueId();

  const response = await axiosInstance.get<PresignedUrlResponse>(
    '/images/presigned',
    {
      params: {
        uuid: deviceUUID,
        type: type,
      },
    },
  );

  return response.data;
};

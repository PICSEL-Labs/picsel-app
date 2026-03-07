import { NotificationDetail, NotificationPreview } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';
import { CommonResponseType } from '@/shared/api/types';

interface GetNotificationsResponse extends CommonResponseType {
  data: NotificationPreview[];
}

interface GetNotificationDetailResponse extends CommonResponseType {
  data: NotificationDetail;
}

export const getNotificationsApi = async (
  limit?: number,
): Promise<NotificationPreview[]> => {
  const response = await axiosInstance.get<GetNotificationsResponse>(
    '/notifications',
    { params: limit ? { limit } : undefined },
  );

  return response.data.data;
};

export const getNotificationDetailApi = async (
  notificationId: number,
): Promise<NotificationDetail> => {
  const response = await axiosInstance.get<GetNotificationDetailResponse>(
    `/notifications/${notificationId}`,
  );

  return response.data.data;
};

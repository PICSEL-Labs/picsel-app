import { useQuery } from '@tanstack/react-query';

import {
  getNotificationSettingApi,
  NotificationSettingData,
} from '../api/notificationSettingApi';

export const useGetNotificationSetting = () => {
  return useQuery<NotificationSettingData>({
    queryKey: ['notificationSetting'],
    queryFn: getNotificationSettingApi,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
};

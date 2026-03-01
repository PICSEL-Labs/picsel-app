import { useQuery } from '@tanstack/react-query';

import { getNotificationDetailApi } from '../api/notificationApi';
import { NotificationDetail } from '../types';

export const useGetNotificationDetail = (notificationId: number) => {
  return useQuery<NotificationDetail>({
    queryKey: ['notification', notificationId],
    queryFn: () => getNotificationDetailApi(notificationId),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
};

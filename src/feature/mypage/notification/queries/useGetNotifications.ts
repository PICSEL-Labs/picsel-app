import { useQuery } from '@tanstack/react-query';

import { getNotificationsApi } from '../api/notificationApi';
import { NotificationPreview } from '../types';

export const useGetNotifications = () => {
  return useQuery<NotificationPreview[]>({
    queryKey: ['notifications'],
    queryFn: () => getNotificationsApi(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
};

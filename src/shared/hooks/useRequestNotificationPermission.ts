import { useEffect } from 'react';

import { requestNotifications, RESULTS } from 'react-native-permissions';

import { patchNotificationSettingApi } from '@/feature/mypage/notification/api/notificationSettingApi';
import { useNotificationPromptStore } from '@/shared/store';

export const useRequestNotificationPermission = () => {
  const hasRequested = useNotificationPromptStore(
    state => state.hasRequestedNotification,
  );
  const hasHydrated = useNotificationPromptStore(state => state._hasHydrated);
  const setHasRequested = useNotificationPromptStore(
    state => state.setHasRequestedNotification,
  );

  useEffect(() => {
    if (!hasHydrated || hasRequested) {
      return;
    }

    const requestPermission = async () => {
      try {
        const { status } = await requestNotifications([
          'alert',
          'sound',
          'badge',
        ]);

        setHasRequested(true);

        if (status === RESULTS.GRANTED) {
          await patchNotificationSettingApi({
            isPicselNewsEnabled: true,
            isEventNewsEnabled: true,
          });
        }
      } catch (error) {
        console.warn('푸시 알림 권한 요청 실패:', error);
      }
    };

    requestPermission();
  }, [hasHydrated, hasRequested, setHasRequested]);
};

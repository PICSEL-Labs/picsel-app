import { useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Alert, Linking } from 'react-native';

import { patchNotificationSettingApi } from '../api/notificationSettingApi';
import {
  PERMISSION_ALERT,
  PICSEL_NEWS_TOAST,
  EVENT_REJECT_ALERT,
  EVENT_REJECT_CONFIRM_ALERT,
  EVENT_AGREE_ALERT,
  EVENT_AGREE_CONFIRM_ALERT,
} from '../constants/notificationSettingTexts';
import { useGetNotificationSetting } from '../queries/useGetNotificationSetting';
import { formatISOToDate } from '../utils/formatDate';

import { useNotificationPermission } from './useNotificationPermission';

import { useToastStore } from '@/shared/store/ui/toast';

const showPermissionAlert = () => {
  Alert.alert(PERMISSION_ALERT.title, PERMISSION_ALERT.message, [
    { text: PERMISSION_ALERT.cancelText, style: 'cancel' },
    {
      text: PERMISSION_ALERT.confirmText,
      onPress: () => Linking.openSettings(),
    },
  ]);
};

export const useNotificationSetting = () => {
  const { checkPermission } = useNotificationPermission();
  const { data } = useGetNotificationSetting();
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  const isPicselNewsEnabled = data?.isPicselNewsEnabled ?? false;
  const isEventNewsEnabled = data?.isEventNewsEnabled ?? false;
  const isMarketingAgreed = data?.isMarketingAgreementAgreed ?? false;
  const marketingConsentedAt = data?.marketingConsentedAt ?? null;

  const invalidateSetting = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['notificationSetting'] });
  }, [queryClient]);

  const handlePicselNewsToggle = useCallback(async () => {
    if (isPicselNewsEnabled) {
      await patchNotificationSettingApi({ isPicselNewsEnabled: false });
      invalidateSetting();
      showToast(PICSEL_NEWS_TOAST.reject);
    } else {
      const granted = await checkPermission();

      if (granted) {
        await patchNotificationSettingApi({ isPicselNewsEnabled: true });
        invalidateSetting();
        showToast(PICSEL_NEWS_TOAST.agree);
      } else {
        showPermissionAlert();
      }
    }
  }, [isPicselNewsEnabled, checkPermission, showToast, invalidateSetting]);

  const handleEventNewsToggle = useCallback(async () => {
    if (isEventNewsEnabled) {
      Alert.alert(EVENT_REJECT_ALERT.title, EVENT_REJECT_ALERT.message, [
        { text: EVENT_REJECT_ALERT.cancelText, style: 'cancel' },
        {
          text: EVENT_REJECT_ALERT.confirmText,
          onPress: async () => {
            const result = await patchNotificationSettingApi({
              isEventNewsEnabled: false,
            });
            invalidateSetting();

            const dateStr = result.marketingRejectedAt
              ? formatISOToDate(result.marketingRejectedAt)
              : '';

            Alert.alert(
              EVENT_REJECT_CONFIRM_ALERT.title,
              EVENT_REJECT_CONFIRM_ALERT.message(dateStr),
              [{ text: EVENT_REJECT_CONFIRM_ALERT.confirmText }],
            );
          },
        },
      ]);
    } else {
      const granted = await checkPermission();

      if (!granted) {
        showPermissionAlert();
        return;
      }

      Alert.alert(EVENT_AGREE_ALERT.title, EVENT_AGREE_ALERT.message, [
        { text: EVENT_AGREE_ALERT.cancelText, style: 'cancel' },
        {
          text: EVENT_AGREE_ALERT.confirmText,
          onPress: async () => {
            const result = await patchNotificationSettingApi({
              isEventNewsEnabled: true,
            });
            invalidateSetting();

            const dateStr = result.marketingConsentedAt
              ? formatISOToDate(result.marketingConsentedAt)
              : '';

            Alert.alert(
              EVENT_AGREE_CONFIRM_ALERT.title,
              EVENT_AGREE_CONFIRM_ALERT.message(dateStr),
              [{ text: EVENT_AGREE_CONFIRM_ALERT.confirmText }],
            );
          },
        },
      ]);
    }
  }, [isEventNewsEnabled, checkPermission, invalidateSetting]);

  return {
    isPicselNewsEnabled,
    isEventNewsEnabled,
    isMarketingAgreed,
    marketingConsentedAt,
    handlePicselNewsToggle,
    handleEventNewsToggle,
  };
};

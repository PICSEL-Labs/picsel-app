import { useCallback, useEffect, useState } from 'react';

import { Alert, Linking } from 'react-native';

import {
  PERMISSION_ALERT,
  PICSEL_NEWS_TOAST,
  EVENT_REJECT_ALERT,
  EVENT_REJECT_CONFIRM_ALERT,
  EVENT_AGREE_ALERT,
  EVENT_AGREE_CONFIRM_ALERT,
} from '../constants/notificationSettingTexts';

import { useMarketingConsent } from './useMarketingConsent';
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
  const { isPermissionGranted, checkPermission } = useNotificationPermission();
  const {
    isConsented,
    consentedAt,
    isLoaded,
    agreeMarketing,
    rejectMarketing,
  } = useMarketingConsent();
  const { showToast } = useToastStore();

  const [isPicselNewsEnabled, setIsPicselNewsEnabled] = useState(false);
  const [isEventNewsEnabled, setIsEventNewsEnabled] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    setIsPicselNewsEnabled(isPermissionGranted);
    setIsEventNewsEnabled(isPermissionGranted && isConsented);
  }, [isPermissionGranted, isConsented, isLoaded]);

  const handlePicselNewsToggle = useCallback(async () => {
    if (isPicselNewsEnabled) {
      setIsPicselNewsEnabled(false);
      showToast(PICSEL_NEWS_TOAST.reject);
    } else {
      const granted = await checkPermission();

      if (granted) {
        setIsPicselNewsEnabled(true);
        showToast(PICSEL_NEWS_TOAST.agree);
      } else {
        showPermissionAlert();
      }
    }
  }, [isPicselNewsEnabled, checkPermission, showToast]);

  const handleEventNewsToggle = useCallback(async () => {
    if (isEventNewsEnabled) {
      Alert.alert(EVENT_REJECT_ALERT.title, EVENT_REJECT_ALERT.message, [
        { text: EVENT_REJECT_ALERT.cancelText, style: 'cancel' },
        {
          text: EVENT_REJECT_ALERT.confirmText,
          onPress: async () => {
            const dateStr = await rejectMarketing();
            setIsEventNewsEnabled(false);

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
            const dateStr = await agreeMarketing();
            setIsEventNewsEnabled(true);

            Alert.alert(
              EVENT_AGREE_CONFIRM_ALERT.title,
              EVENT_AGREE_CONFIRM_ALERT.message(dateStr),
              [{ text: EVENT_AGREE_CONFIRM_ALERT.confirmText }],
            );
          },
        },
      ]);
    }
  }, [isEventNewsEnabled, checkPermission, agreeMarketing, rejectMarketing]);

  return {
    isPicselNewsEnabled,
    isEventNewsEnabled,
    consentedAt,
    isConsented,
    handlePicselNewsToggle,
    handleEventNewsToggle,
  };
};

import { useMemo } from 'react';

import { NOTIFICATION_SETTING_ITEMS } from '../constants/notificationSettingTexts';

import { useNotificationSetting } from './useNotificationSetting';

export const useSettingItems = () => {
  const {
    isPicselNewsEnabled,
    isEventNewsEnabled,
    marketingConsentedAt,
    handlePicselNewsToggle,
    handleEventNewsToggle,
  } = useNotificationSetting();

  const settingItems = useMemo(
    () => [
      {
        ...NOTIFICATION_SETTING_ITEMS[0],
        value: isPicselNewsEnabled,
        onValueChange: handlePicselNewsToggle,
      },
      {
        ...NOTIFICATION_SETTING_ITEMS[1],
        value: isEventNewsEnabled,
        onValueChange: handleEventNewsToggle,
      },
    ],
    [
      isPicselNewsEnabled,
      isEventNewsEnabled,
      marketingConsentedAt,
      handlePicselNewsToggle,
      handleEventNewsToggle,
    ],
  );

  return { settingItems };
};

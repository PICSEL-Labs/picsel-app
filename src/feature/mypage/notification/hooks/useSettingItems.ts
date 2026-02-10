import { useMemo } from 'react';

import {
  NOTIFICATION_SETTING_ITEMS,
  CONSENT_SUB_TEXT_PREFIX,
} from '../constants/notificationSettingTexts';

import { useNotificationSetting } from './useNotificationSetting';

export const useSettingItems = () => {
  const {
    isPicselNewsEnabled,
    isEventNewsEnabled,
    consentedAt,
    isConsented,
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
        subText:
          isConsented && consentedAt
            ? `${CONSENT_SUB_TEXT_PREFIX} ${consentedAt}`
            : undefined,
      },
    ],
    [
      isPicselNewsEnabled,
      isEventNewsEnabled,
      isConsented,
      consentedAt,
      handlePicselNewsToggle,
      handleEventNewsToggle,
    ],
  );

  return { settingItems };
};

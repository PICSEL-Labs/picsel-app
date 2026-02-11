import { useMemo } from 'react';

import {
  NOTIFICATION_SETTING_ITEMS,
  CONSENT_SUB_TEXT_PREFIX,
} from '../constants/notificationSettingTexts';
import { formatISOToDate } from '../utils/formatDate';

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
        subText:
          isEventNewsEnabled && marketingConsentedAt
            ? `${CONSENT_SUB_TEXT_PREFIX} ${formatISOToDate(marketingConsentedAt)}`
            : undefined,
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

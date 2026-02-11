import { axiosInstance } from '@/shared/api/axiosInstance';
import { CommonResponseType } from '@/shared/api/types';

export interface NotificationSettingData {
  isPicselNewsEnabled: boolean;
  isEventNewsEnabled: boolean;
  isMarketingAgreementAgreed: boolean;
  marketingConsentedAt: string | null;
  marketingRejectedAt: string | null;
}

interface GetNotificationSettingResponse extends CommonResponseType {
  data: NotificationSettingData;
}

export const getNotificationSettingApi =
  async (): Promise<NotificationSettingData> => {
    const response = await axiosInstance.get<GetNotificationSettingResponse>(
      '/users/notification-setting',
    );

    return response.data.data;
  };

export interface PatchNotificationSettingRequest {
  isPicselNewsEnabled?: boolean;
  isEventNewsEnabled?: boolean;
}

interface PatchNotificationSettingResponse extends CommonResponseType {
  data: NotificationSettingData;
}

export const patchNotificationSettingApi = async (
  body: PatchNotificationSettingRequest,
): Promise<NotificationSettingData> => {
  const response = await axiosInstance.patch<PatchNotificationSettingResponse>(
    '/users/notification-setting',
    body,
  );

  return response.data.data;
};

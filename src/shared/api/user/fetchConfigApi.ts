import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { axiosInstance } from '../axiosInstance';

import { UserConfigResponse } from './types';

export const fetchUserConfig = async () => {
  const appVersion = DeviceInfo.getVersion();
  const platform = Platform.OS === 'ios' ? 'iOS' : 'Android';
  const deviceModel = DeviceInfo.getModel();
  const deviceUUID = await DeviceInfo.getUniqueId();

  const userAgent = `PICSEL/${appVersion} (${platform}; ${deviceModel}; ${deviceUUID})`;

  const response = await axiosInstance.get<UserConfigResponse>('/app/config', {
    headers: {
      'User-Agent': userAgent,
    },
  });

  return response.data;
};

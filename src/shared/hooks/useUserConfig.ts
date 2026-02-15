import { useEffect } from 'react';

import DeviceInfo from 'react-native-device-info';

import { fetchUserConfig } from '../api/user/fetchConfigApi';
import { useAppConfigStore } from '../store';

export const useUserConfig = () => {
  useEffect(() => {
    const init = async () => {
      try {
        const response = await fetchUserConfig();
        const latestVersion = response.data.version.latest;
        const currentVersion = DeviceInfo.getVersion();

        useAppConfigStore
          .getState()
          .setIsLatest(currentVersion >= latestVersion);
      } catch (e) {
        console.warn('앱 설정 정보를 불러올 수 없습니다.', e);
      }
    };
    init();
  }, []);
};

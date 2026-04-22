import axios from 'axios';
import { Platform } from 'react-native';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';

import { useUserStore } from '../store';

export const axiosInstance = axios.create({
  baseURL: Config.API_KEY,
  timeout: 60000,
  headers: { 'X-Custom-Header': 'foobar' },
  withCredentials: true,
});

// User-Agent 캐싱
let cachedUserAgent: string | null = null;

const getUserAgent = async (): Promise<string> => {
  if (cachedUserAgent) {
    return cachedUserAgent;
  }
  const appVersion = DeviceInfo.getVersion();
  const platform = Platform.OS === 'ios' ? 'iOS' : 'Android';
  const deviceModel = DeviceInfo.getModel();
  const deviceUUID = await DeviceInfo.getUniqueId();
  cachedUserAgent = `PICSEL/${appVersion} (${platform}; ${deviceModel}; ${deviceUUID})`;
  return cachedUserAgent;
};

// accessToken + User-Agent Header interceptor
axiosInstance.interceptors.request.use(
  async config => {
    const accessToken = useUserStore.getState().accessToken;

    if (accessToken) {
      config.headers['Access-Token'] = accessToken;
    }

    config.headers['User-Agent'] = await getUserAgent();

    return config;
  },

  error => {
    return Promise.reject(error);
  },
);

// accessToken 재발급 interceptor
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const { refreshToken, setAccessToken, logout } = useUserStore.getState();

    if (error.response?.data?.code === 1401) {
      try {
        const res = await axios.post(
          `${Config.API_KEY}/auth/refresh/access`,
          {},
          {
            headers: {
              'Refresh-Token': refreshToken,
            },
          },
        );

        const newAccessToken = res.data.data.accessToken;

        setAccessToken(newAccessToken);

        error.config.headers['Access-Token'] = newAccessToken;

        return axiosInstance.request(error.config);
      } catch (refreshError) {
        logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

// refreshToken issue
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const { logout } = useUserStore.getState();

    if (error.response?.data?.code === 1402) {
      logout();
    }

    return Promise.reject(error);
  },
);

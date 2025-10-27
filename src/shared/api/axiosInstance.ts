import axios from 'axios';
import Config from 'react-native-config';

import { useUserStore } from '../store';

export const axiosInstance = axios.create({
  baseURL: Config.API_KEY,
  timeout: 60000,
  headers: { 'X-Custom-Header': 'foobar' },
  withCredentials: true,
});

// accessToken Header interceptor
axiosInstance.interceptors.request.use(
  config => {
    const accessToken = useUserStore.getState().accessToken;

    if (accessToken) {
      config.headers['Access-Token'] = accessToken;
    }
    console.log('axios config : ', config);

    return config;
  },

  error => {
    console.log('axios config : ', error);
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

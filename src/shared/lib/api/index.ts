import axios from 'axios';
import Config from 'react-native-config';

import { useAuthStore } from '@/store/auth';

export const axiosInstance = axios.create({
  baseURL: Config.API_KEY,
  timeout: 60000,
  headers: { 'X-Custom-Header': 'foobar' },
  withCredentials: true,
});

// accessToken Header interceptor
axiosInstance.interceptors.request.use(
  config => {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken) {
      config.headers['Access-Token'] = accessToken;
    }
    console.log('axios config : ', config);

    console.log('accessToken: ', config.headers.Authorization);
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
    const { refreshToken, setAccessToken, logout } = useAuthStore.getState();

    if (error.response?.status === 401 && refreshToken) {
      try {
        // 1. 토큰 재발급 요청
        const res = await axios.post('/auth/refresh/access', { refreshToken });

        // 2. accessToken 저장
        setAccessToken(res.data.accessToken);

        // 3. 원래 요청 다시 보내기
        error.config.headers['Access-Token'] = res.data.accessToken;
        return axiosInstance.request(error.config);
      } catch (refreshError) {
        logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

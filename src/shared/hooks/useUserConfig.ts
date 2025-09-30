import { useEffect } from 'react';

import { fetchUserConfig } from '../api/user/fetchConfigApi';

export const useUserConfig = () => {
  useEffect(() => {
    const init = async () => {
      const response = await fetchUserConfig();

      console.log(response.data.version);
    };
    init();
  }, []);
};

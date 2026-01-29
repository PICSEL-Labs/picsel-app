import { useQuery } from '@tanstack/react-query';

import { getMyPicselsApi } from '../api/getMyPicselsApi';
import { MyPicselParams, MyPicselResult } from '../types';

export const useGetMyPicsels = (params: MyPicselParams = {}) => {
  const { page = 0, size = 20, sort = 'RECENT_DESC' } = params;

  return useQuery<MyPicselResult>({
    queryKey: ['myPicsels', page, size, sort],
    queryFn: () => getMyPicselsApi({ page, size, sort }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
};

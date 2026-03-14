import { useInfiniteQuery } from '@tanstack/react-query';

import { getMyPicselsApi } from '../api/getMyPicselsApi';
import { MyPicselResult, MyPicselSortType } from '../types';

interface UseGetMyPicselsParams {
  size?: number;
  sort?: MyPicselSortType;
}

export const useGetMyPicsels = (params: UseGetMyPicselsParams = {}) => {
  const { size = 50, sort = 'RECENT_DESC' } = params;

  return useInfiniteQuery<MyPicselResult>({
    queryKey: ['myPicsels', size, sort],
    queryFn: ({ pageParam }) =>
      getMyPicselsApi({ page: pageParam as number, size, sort }),
    initialPageParam: 0,
    getNextPageParam: lastPage =>
      lastPage.last ? undefined : lastPage.pageNumber + 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
};

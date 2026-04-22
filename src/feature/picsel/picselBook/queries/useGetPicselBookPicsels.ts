import { useInfiniteQuery } from '@tanstack/react-query';

import { getPicselBookPicselsApi } from '../api/getPicselBookPicselsApi';
import { PicselBookFolderResult, PicselBookFolderSortType } from '../types';

interface UseGetPicselBookPicselsParams {
  picselbookId: string;
  size?: number;
  sortType?: PicselBookFolderSortType;
}

export const useGetPicselBookPicsels = (
  params: UseGetPicselBookPicselsParams,
) => {
  const { picselbookId, size = 50, sortType = 'RECENT_DESC' } = params;

  return useInfiniteQuery<PicselBookFolderResult>({
    queryKey: ['picselBookPicsels', picselbookId, size, sortType],
    queryFn: ({ pageParam }) =>
      getPicselBookPicselsApi({
        picselbookId,
        page: pageParam as number,
        size,
        sortType,
      }),
    initialPageParam: 0,
    getNextPageParam: lastPage =>
      lastPage.last ? undefined : lastPage.pageNumber + 1,
    enabled: !!picselbookId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
};

import { useQuery } from '@tanstack/react-query';

import { getPicselBookPicselsApi } from '../api/getPicselBookPicselsApi';
import { PicselBookFolderParams, PicselBookFolderResult } from '../types';

export const useGetPicselBookPicsels = (params: PicselBookFolderParams) => {
  const {
    picselbookId,
    page = 0,
    size = 20,
    sortType = 'RECENT_DESC',
  } = params;

  return useQuery<PicselBookFolderResult>({
    queryKey: ['picselBookPicsels', picselbookId, page, size, sortType],
    queryFn: () =>
      getPicselBookPicselsApi({ picselbookId, page, size, sortType }),
    enabled: !!picselbookId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
};

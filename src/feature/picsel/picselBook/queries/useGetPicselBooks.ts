import { useQuery } from '@tanstack/react-query';

import { getPicselBooksApi } from '../api/getPicselBooksApi';
import { PicselBookParams, PicselBookResult } from '../types';

export const useGetPicselBooks = (params: PicselBookParams = {}) => {
  const { page = 0, size = 20, sort = 'RECENT_CREATED_DESC' } = params;

  return useQuery<PicselBookResult>({
    queryKey: ['picselBooks', page, size, sort],
    queryFn: () => getPicselBooksApi({ page, size, sort }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
};

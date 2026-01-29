import { useQuery } from '@tanstack/react-query';

import { getPicselBooksApi } from '../api/getPicselBooksApi';
import { PicselBookItem, PicselBookParams } from '../types';

export const useGetPicselBooks = (params: PicselBookParams = {}) => {
  const { sort = 'RECENT_CREATED_DESC' } = params;

  return useQuery<PicselBookItem[]>({
    queryKey: ['picselBooks', sort],
    queryFn: () => getPicselBooksApi({ sort }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
};

import { useQuery } from '@tanstack/react-query';

import { getPicselDetailApi } from '../api/getPicselDetailApi';
import { PicselDetailResponse } from '../types';

export const useGetPicselDetail = (picselId: string) => {
  return useQuery<PicselDetailResponse>({
    queryKey: ['picselDetail', picselId],
    queryFn: () => getPicselDetailApi(picselId),
    enabled: !!picselId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
};

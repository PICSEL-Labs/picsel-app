import { useEffect } from 'react';

import { userQueryOptions } from '../queries/useGetUser';

import { queryClient } from '@/providers/AppProvider';

export const usePrefetchMyPage = () => {
  useEffect(() => {
    queryClient.prefetchQuery(userQueryOptions);
  }, []);
};

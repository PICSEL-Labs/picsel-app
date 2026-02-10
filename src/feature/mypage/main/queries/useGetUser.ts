import { useQuery } from '@tanstack/react-query';

import { getUserApi, UserData } from '../api/getUserApi';

export const useGetUser = () => {
  return useQuery<UserData>({
    queryKey: ['user'],
    queryFn: getUserApi,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
};

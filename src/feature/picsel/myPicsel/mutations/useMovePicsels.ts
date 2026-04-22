import { useMutation, useQueryClient } from '@tanstack/react-query';

import { movePicselsApi } from '../api/movePicselsApi';
import { MovePicselsRequest } from '../types';

export const useMovePicsels = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: MovePicselsRequest) => movePicselsApi(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myPicsels'] });
      queryClient.invalidateQueries({ queryKey: ['picselBooks'] });
      queryClient.invalidateQueries({ queryKey: ['picselDetail'] });
      queryClient.invalidateQueries({ queryKey: ['picselBookPicsels'] });
    },
  });
};

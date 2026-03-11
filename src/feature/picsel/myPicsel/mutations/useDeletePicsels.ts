import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deletePicselsApi } from '../api/deletePicselsApi';
import { DeletePicselsRequest } from '../types';

export const useDeletePicsels = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: DeletePicselsRequest) => deletePicselsApi(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myPicsels'] });
      queryClient.invalidateQueries({ queryKey: ['picselBooks'] });
    },
    onError: error => {
      console.error('픽셀 삭제 실패:', error);
    },
  });
};

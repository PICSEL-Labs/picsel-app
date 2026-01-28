import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deletePicselBooksApi } from '../api/deletePicselBooksApi';
import { DeletePicselBooksRequest } from '../types';

export const useDeletePicselBooks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: DeletePicselBooksRequest) =>
      deletePicselBooksApi(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['picselBooks'] });
    },
    onError: error => {
      console.error('픽셀북 삭제 실패:', error);
    },
  });
};

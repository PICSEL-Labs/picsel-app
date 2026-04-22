import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deletePicselBooksApi } from '../api/deletePicselBooksApi';
import { DeletePicselBooksRequest, PicselBookItem } from '../types';

export const useDeletePicselBooks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: DeletePicselBooksRequest) =>
      deletePicselBooksApi(request),
    onMutate: async (request: DeletePicselBooksRequest) => {
      await queryClient.cancelQueries({ queryKey: ['picselBooks'] });

      const previousQueries = queryClient.getQueriesData<PicselBookItem[]>({
        queryKey: ['picselBooks'],
      });

      queryClient.setQueriesData<PicselBookItem[]>(
        { queryKey: ['picselBooks'] },
        oldData =>
          oldData?.filter(
            book => !request.picselbookIds.includes(book.picselbookId),
          ),
      );

      return { previousQueries };
    },
    onError: (error, _request, context) => {
      console.error('픽셀북 삭제 실패:', error);
      context?.previousQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['picselBooks'],
        refetchType: 'none',
      });
    },
  });
};

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deletePicselsApi } from '../api/deletePicselsApi';
import { DeletePicselsRequest, MyPicselResult } from '../types';

export const useDeletePicsels = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: DeletePicselsRequest) => deletePicselsApi(request),
    onMutate: async (request: DeletePicselsRequest) => {
      await queryClient.cancelQueries({ queryKey: ['myPicsels'] });

      const previousQueries = queryClient.getQueriesData<MyPicselResult>({
        queryKey: ['myPicsels'],
      });

      queryClient.setQueriesData<MyPicselResult>(
        { queryKey: ['myPicsels'] },
        oldData => {
          if (!oldData) {
            return oldData;
          }
          const filtered = oldData.content.filter(
            picsel => !request.picselIds.includes(picsel.picselId),
          );
          return {
            ...oldData,
            content: filtered,
            totalElements:
              oldData.totalElements -
              (oldData.content.length - filtered.length),
          };
        },
      );

      return { previousQueries };
    },
    onError: (error, _request, context) => {
      console.error('픽셀 삭제 실패:', error);
      context?.previousQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['myPicsels'],
        refetchType: 'none',
      });
      queryClient.invalidateQueries({
        queryKey: ['picselBooks'],
        refetchType: 'none',
      });
    },
  });
};

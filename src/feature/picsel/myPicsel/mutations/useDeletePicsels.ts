import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { deletePicselsApi } from '../api/deletePicselsApi';
import { DeletePicselsRequest, MyPicselResult } from '../types';

export const useDeletePicsels = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: DeletePicselsRequest) => deletePicselsApi(request),
    onMutate: async (request: DeletePicselsRequest) => {
      await queryClient.cancelQueries({ queryKey: ['myPicsels'] });

      const previousQueries = queryClient.getQueriesData<
        InfiniteData<MyPicselResult>
      >({
        queryKey: ['myPicsels'],
      });

      queryClient.setQueriesData<InfiniteData<MyPicselResult>>(
        { queryKey: ['myPicsels'] },
        oldData => {
          if (!oldData) {
            return oldData;
          }

          const deletedCount = request.picselIds.length;

          return {
            ...oldData,
            pages: oldData.pages.map(page => {
              const filtered = page.content.filter(
                picsel => !request.picselIds.includes(picsel.picselId),
              );
              return {
                ...page,
                content: filtered,
                totalElements: page.totalElements - deletedCount,
              };
            }),
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

import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { deletePicselsApi } from '../api/deletePicselsApi';
import { DeletePicselsRequest, MyPicselResult } from '../types';

import { PicselBookFolderResult } from '@/feature/picsel/picselBook/types';

export const useDeletePicsels = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: DeletePicselsRequest) => deletePicselsApi(request),
    onMutate: async (request: DeletePicselsRequest) => {
      await queryClient.cancelQueries({ queryKey: ['myPicsels'] });
      await queryClient.cancelQueries({ queryKey: ['picselBookPicsels'] });

      // 내 픽셀 캐시 백업
      const previousMyPicsels = queryClient.getQueriesData<
        InfiniteData<MyPicselResult>
      >({
        queryKey: ['myPicsels'],
      });

      // 픽셀북 폴더 캐시 백업
      const previousBookPicsels = queryClient.getQueriesData<
        InfiniteData<PicselBookFolderResult>
      >({
        queryKey: ['picselBookPicsels'],
      });

      // 내 픽셀 optimistic update
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

      // 픽셀북 폴더 optimistic update
      queryClient.setQueriesData<InfiniteData<PicselBookFolderResult>>(
        { queryKey: ['picselBookPicsels'] },
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

      return { previousMyPicsels, previousBookPicsels };
    },
    onError: (error, _request, context) => {
      console.error('픽셀 삭제 실패:', error);
      context?.previousMyPicsels.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
      context?.previousBookPicsels.forEach(([queryKey, data]) => {
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
      queryClient.invalidateQueries({
        queryKey: ['picselBookPicsels'],
        refetchType: 'none',
      });
    },
  });
};

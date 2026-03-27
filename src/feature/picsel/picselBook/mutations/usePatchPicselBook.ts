import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchPicselBookApi } from '../api/patchPicselBookApi';
import { PatchPicselBookRequest, PicselBookItem } from '../types';

import { clearGlobalLoadedUri } from '@/shared/hooks/useImagePreload';
import { getImageUrl } from '@/shared/utils/image';
import { uploadImageToS3 } from '@/shared/utils/imageUpload';

interface PatchPicselBookParams extends PatchPicselBookRequest {
  picselbookId: string;
}

export const usePatchPicselBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      picselbookId,
      bookName,
      coverImagePath,
    }: PatchPicselBookParams) => {
      const body: PatchPicselBookRequest = {};

      if (bookName !== undefined) {
        body.bookName = bookName;
      }

      if (coverImagePath) {
        const s3ImageUrl = await uploadImageToS3(
          coverImagePath,
          picselbookId,
          'PICSELBOOK',
        );
        body.coverImagePath = s3ImageUrl;
      } else if (coverImagePath === null) {
        body.coverImagePath = null;
      }

      return patchPicselBookApi(picselbookId, body);
    },
    onSuccess: (response, variables) => {
      const isCoverChange = variables.coverImagePath !== undefined;
      const updatedBook = response.data;

      if (isCoverChange) {
        // 이전 커버 이미지 URL을 전역 이미지 프리로드 캐시에서 제거
        const queries = queryClient.getQueriesData<PicselBookItem[]>({
          queryKey: ['picselBooks'],
        });
        for (const [, data] of queries) {
          const oldBook = data?.find(
            b => b.picselbookId === variables.picselbookId,
          );
          if (oldBook?.coverImagePath) {
            clearGlobalLoadedUri(getImageUrl(oldBook.coverImagePath));
          }
        }
      }

      // 쿼리 데이터 직접 업데이트 (커버 변경 시 이미지 캐시 버스팅 포함)
      queryClient.setQueriesData<PicselBookItem[]>(
        { queryKey: ['picselBooks'] },
        oldData => {
          if (!oldData) {
            return oldData;
          }

          return oldData.map(book => {
            if (book.picselbookId !== variables.picselbookId) {
              return book;
            }

            return {
              ...updatedBook,
              coverImagePath:
                isCoverChange && updatedBook.coverImagePath
                  ? `${updatedBook.coverImagePath}?v=${Date.now()}`
                  : updatedBook.coverImagePath,
            };
          });
        },
      );
    },
  });
};

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPicselBookApi } from '../api/createPicselBookApi';
import { CreatePicselBookRequest } from '../types';

import { uploadImageToS3 } from '@/shared/utils/imageUpload';

export const useCreatePicselBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      picselbookId,
      bookName,
      coverImagePath,
    }: CreatePicselBookRequest) => {
      if (!coverImagePath) {
        return createPicselBookApi({
          picselbookId,
          bookName,
          coverImagePath: null,
        });
      }

      const s3ImageUrl = await uploadImageToS3(
        coverImagePath,
        picselbookId,
        'PICSELBOOK',
      );

      return createPicselBookApi({
        picselbookId,
        bookName,
        coverImagePath: s3ImageUrl,
      });
    },
    onSuccess: response => {
      queryClient.invalidateQueries({ queryKey: ['picselBooks'] });

      return response.data;
    },
    onError: error => {
      console.error('픽셀북 생성 실패:', error);
    },
  });
};

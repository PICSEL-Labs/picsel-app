import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchPicselBookApi } from '../api/patchPicselBookApi';
import { PatchPicselBookRequest } from '../types';

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['picselBooks'] });
    },
  });
};

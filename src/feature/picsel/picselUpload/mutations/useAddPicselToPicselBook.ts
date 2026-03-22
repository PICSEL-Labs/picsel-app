import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addPicselToPicselBookApi } from '../api/addPicselToPicselBookApi';
import { PicselUploadRequest } from '../types';

import { uploadMultipleImagesToS3 } from '@/shared/utils/imageUpload';

export const useAddPicselToPicselBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: PicselUploadRequest) => {
      const s3ImageUrls = await uploadMultipleImagesToS3(
        request.imagePaths,
        request.picselId,
        'PICSEL',
      );

      return addPicselToPicselBookApi({
        ...request,
        imagePaths: s3ImageUrls,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['picselBooks'] });
    },
    onError: error => {
      console.error('픽셀 업로드 실패:', error);
    },
  });
};

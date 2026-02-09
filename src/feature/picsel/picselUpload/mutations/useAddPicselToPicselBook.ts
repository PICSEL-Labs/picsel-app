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
        'PICSEL',
      );

      return addPicselToPicselBookApi({
        ...request,
        imagePaths: s3ImageUrls,
      });
    },
    onSuccess: response => {
      console.log('픽셀 업로드 성공:', response);
      queryClient.invalidateQueries({ queryKey: ['picselBooks'] });
    },
    onError: error => {
      console.log('픽셀 업로드 실패:', error);
    },
  });
};

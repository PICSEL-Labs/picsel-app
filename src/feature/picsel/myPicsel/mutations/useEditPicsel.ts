import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editPicselApi } from '../api/editPicselApi';
import { EditPicselRequest } from '../types';

import { getRelativeImagePath } from '@/shared/utils/image';
import { uploadMultipleImagesToS3 } from '@/shared/utils/imageUpload';

export const useEditPicsel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      picselId,
      request,
    }: {
      picselId: string;
      request: EditPicselRequest;
    }) => {
      // 기존 사진(http URL)과 새 사진(로컬 경로)이 섞여 있으므로 새 사진만 S3에 업로드
      const localPhotos = request.imagePaths.filter(p => !p.startsWith('http'));
      const s3ImageUrls = await uploadMultipleImagesToS3(
        localPhotos,
        picselId,
        'PICSEL',
      );

      // 기존 사진은 상대 경로로 변환, 새 사진은 S3 업로드 결과로 교체 (순서 유지)
      let s3Index = 0;
      const imagePaths = request.imagePaths.map(photo =>
        photo.startsWith('http')
          ? getRelativeImagePath(photo)
          : s3ImageUrls[s3Index++],
      );

      return editPicselApi(picselId, { ...request, imagePaths });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myPicsels'] });
      queryClient.invalidateQueries({ queryKey: ['picselDetail'] });
      queryClient.invalidateQueries({ queryKey: ['picselBookPicsels'] });
    },
  });
};

import { useMutation } from '@tanstack/react-query';

import { createPicselDraftApi } from '../api/createPicselDraftApi';

export const useCreatePicselDraft = () => {
  return useMutation({
    mutationFn: async (picselbookId: string) => {
      const response = await createPicselDraftApi(picselbookId);
      return response.data.draftUuid;
    },
    onError: error => {
      console.log('픽셀 드래프트 생성 실패:', error);
    },
  });
};

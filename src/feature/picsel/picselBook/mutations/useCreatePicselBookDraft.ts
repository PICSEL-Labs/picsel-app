import { useMutation } from '@tanstack/react-query';

import { createPicselBookDraftApi } from '../api/createPicselBookDraftApi';

export const useCreatePicselBookDraft = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await createPicselBookDraftApi();
      return response.data.draftUuid;
    },
    onError: error => {
      console.log('픽셀북 드래프트 생성 실패:', error);
    },
  });
};

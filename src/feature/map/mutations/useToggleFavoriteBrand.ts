import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  BrandFavToggleRequest,
  toggleFavoriteBrandApi,
} from '../api/toggleFavoriteBrandAPi';

export const useToggleFavoriteBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: BrandFavToggleRequest) => toggleFavoriteBrandApi(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      queryClient.invalidateQueries({ queryKey: ['stores'] });
    },
    onError: error => {
      console.error('즐겨찾기 토글 실패:', error);
    },
  });
};

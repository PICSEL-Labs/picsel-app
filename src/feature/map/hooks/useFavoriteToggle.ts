import { useEffect } from 'react';

import { useToggleFavoriteBrand } from '../mutations/useToggleFavoriteBrand';

import { useFavoriteStore } from '@/shared/store';
import { useToastStore } from '@/shared/store/ui/toast';

interface Props {
  brandId?: string;
  isFavorite: boolean;
}

export const useFavoriteToggle = ({ brandId, isFavorite }: Props) => {
  const { optimisticFavorites, toggleOptimisticFavorite, syncFavorite } =
    useFavoriteStore();
  const { mutate: toggleFavorite, isPending } = useToggleFavoriteBrand();
  const { showToast } = useToastStore();

  const optimisticFavorite = brandId
    ? (optimisticFavorites[brandId] ?? isFavorite)
    : isFavorite;

  useEffect(() => {
    if (brandId && optimisticFavorites[brandId] === undefined) {
      syncFavorite(brandId, isFavorite);
    }
  }, [brandId, isFavorite, syncFavorite, optimisticFavorites]);

  const handleToggleFavorite = (margin: number) => {
    if (isPending || !brandId) {
      return;
    }

    const action = optimisticFavorite ? 'REMOVE' : 'ADD';
    toggleOptimisticFavorite(brandId);

    toggleFavorite(
      {
        brandId,
        action,
      },
      {
        onSuccess: () => {
          showToast(
            action === 'ADD'
              ? '찜한 브랜드에 추가했어요'
              : '찜한 브랜드에서 삭제했어요',
            margin,
          );
        },
        onError: () => {
          syncFavorite(brandId, isFavorite);
        },
      },
    );
  };

  return {
    optimisticFavorite,
    handleToggleFavorite,
    isPending,
  };
};

import { useEffect, useRef } from 'react';

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

  const lastToggleTime = useRef(0);
  const COOLDOWN_MS = 1500;

  const optimisticFavorite = brandId
    ? (optimisticFavorites[brandId] ?? isFavorite)
    : isFavorite;

  useEffect(() => {
    if (brandId) {
      syncFavorite(brandId, isFavorite);
    }
  }, [brandId, isFavorite, syncFavorite]);

  const handleToggleFavorite = (margin: number) => {
    if (isPending || !brandId) {
      return;
    }

    const now = Date.now();
    if (now - lastToggleTime.current < COOLDOWN_MS) {
      return;
    }

    lastToggleTime.current = now;
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

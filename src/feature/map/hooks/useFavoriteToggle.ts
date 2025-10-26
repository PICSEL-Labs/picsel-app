import { useEffect } from 'react';

import { useToggleFavoriteBrand } from '../mutations/useToggleFavoriteBrand';

import { useFavoriteStore } from '@/shared/store';

interface Props {
  brandId?: string;
  isFavorite: boolean;
}

export const useFavoriteToggle = ({ brandId, isFavorite }: Props) => {
  const { optimisticFavorites, toggleOptimisticFavorite, syncFavorite } =
    useFavoriteStore();
  const { mutate: toggleFavorite, isPending } = useToggleFavoriteBrand();

  const optimisticFavorite = brandId
    ? (optimisticFavorites[brandId] ?? isFavorite)
    : isFavorite;

  useEffect(() => {
    if (brandId) {
      syncFavorite(brandId, isFavorite);
    }
  }, [brandId, isFavorite, syncFavorite]);

  const handleToggleFavorite = () => {
    if (isPending || !brandId) {
      return;
    }

    toggleOptimisticFavorite(brandId);

    toggleFavorite(
      {
        brandId,
        action: optimisticFavorite ? 'REMOVE' : 'ADD',
      },
      {
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

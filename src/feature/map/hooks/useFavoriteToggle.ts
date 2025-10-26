import { useState, useEffect } from 'react';

import { useToggleFavoriteBrand } from '../mutations/useToggleFavoriteBrand';

interface Props {
  brandId?: string;
  isFavorite: boolean;
}

export const useFavoriteToggle = ({ brandId, isFavorite }: Props) => {
  const [optimisticFavorite, setOptimisticFavorite] = useState(isFavorite);
  const { mutate: toggleFavorite, isPending } = useToggleFavoriteBrand();

  useEffect(() => {
    setOptimisticFavorite(isFavorite);
  }, [isFavorite]);

  const handleToggleFavorite = () => {
    if (isPending || !brandId) {
      return;
    }

    const newFavoriteState = !optimisticFavorite;
    setOptimisticFavorite(newFavoriteState);

    toggleFavorite(
      {
        brandId,
        action: optimisticFavorite ? 'REMOVE' : 'ADD',
      },
      {
        onError: () => {
          setOptimisticFavorite(isFavorite);
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

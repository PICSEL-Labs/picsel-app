import { create } from 'zustand';

interface FavoriteStore {
  optimisticFavorites: Record<string, boolean>;
  setOptimisticFavorite: (brandId: string, isFavorite: boolean) => void;
  toggleOptimisticFavorite: (brandId: string) => void;
  syncFavorite: (brandId: string, isFavorite: boolean) => void;
}

export const useFavoriteStore = create<FavoriteStore>(set => ({
  optimisticFavorites: {},

  setOptimisticFavorite: (brandId, isFavorite) =>
    set(state => ({
      optimisticFavorites: {
        ...state.optimisticFavorites,
        [brandId]: isFavorite,
      },
    })),

  toggleOptimisticFavorite: brandId =>
    set(state => ({
      optimisticFavorites: {
        ...state.optimisticFavorites,
        [brandId]: !state.optimisticFavorites[brandId],
      },
    })),

  syncFavorite: (brandId, isFavorite) =>
    set(state => ({
      optimisticFavorites: {
        ...state.optimisticFavorites,
        [brandId]: isFavorite,
      },
    })),
}));

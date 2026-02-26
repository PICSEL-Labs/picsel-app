import { create } from 'zustand';

interface FavoriteStore {
  optimisticFavorites: Record<string, boolean>;
  setOptimisticFavorite: (brandId: string, isFavorite: boolean) => void;
  toggleOptimisticFavorite: (brandId: string) => void;
  syncFavorites: (favorites: Record<string, boolean>) => void;
  resetFavorites: () => void;
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

  syncFavorites: favorites =>
    set(state => ({
      optimisticFavorites: {
        ...favorites,
        ...state.optimisticFavorites,
      },
    })),

  resetFavorites: () => set({ optimisticFavorites: {} }),
}));

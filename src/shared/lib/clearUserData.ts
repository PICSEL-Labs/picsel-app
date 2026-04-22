import { queryClient } from '@/providers/AppProvider';
import { useFavoriteStore, useSelectedBrandsStore } from '@/shared/store';

export const clearUserData = () => {
  queryClient.clear();
  useSelectedBrandsStore.getState().resetSelectedBrands();
  useFavoriteStore.getState().resetFavorites();
};

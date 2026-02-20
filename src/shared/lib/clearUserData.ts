import { queryClient } from '@/providers/AppProvider';
import { useSelectedBrandsStore } from '@/shared/store';

export const clearUserData = () => {
  queryClient.clear();
  useSelectedBrandsStore.getState().resetSelectedBrands();
};

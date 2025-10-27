import { useMemo } from 'react';

interface Brand {
  brandId: string;
  isFavorite?: boolean;
}

interface Store {
  brandId: string;
}

export const useStoreFavorite = (
  brands?: Brand[],
  selectedStore?: Store | null,
) => {
  return useMemo(() => {
    if (!brands || !selectedStore) {
      return false;
    }

    return (
      brands.find(brand => brand.brandId === selectedStore.brandId)
        ?.isFavorite ?? false
    );
  }, [brands, selectedStore?.brandId]);
};

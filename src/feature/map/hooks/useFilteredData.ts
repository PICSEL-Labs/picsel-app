import { useMemo } from 'react';

import { useFilteredBrandsStore } from '@/shared/store/brand/filterBrands';

interface Store {
  brandId: string;
}

interface Brand {
  brandId: string;
}

interface UseFilteredDataProps<T extends Store, B extends Brand> {
  stores?: T[];
  brands?: B[];
}

export const useFilteredData = <T extends Store, B extends Brand>({
  stores,
  brands,
}: UseFilteredDataProps<T, B>) => {
  const { filteredList } = useFilteredBrandsStore();

  return useMemo(() => {
    if (!stores || !brands || filteredList.length === 0) {
      return {
        filteredStores: stores,
        filteredBrands: brands,
      };
    }

    const brandIds = filteredList.map(b => b.brandId);

    return {
      filteredStores: stores.filter(store => brandIds.includes(store.brandId)),
      filteredBrands: brands.filter(brand => brandIds.includes(brand.brandId)),
    };
  }, [stores, brands, filteredList]);
};

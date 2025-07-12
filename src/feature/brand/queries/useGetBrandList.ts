import { useQuery } from '@tanstack/react-query';

import { getBrandsListApi } from '../api/getBrandListApi';
import { Brand } from '../types/brandType';

export const useGetBrandsList = () => {
  return useQuery<Brand[]>({
    queryKey: ['brands'],
    queryFn: getBrandsListApi,
    select: data => [
      {
        brandId: 'NONE',
        name: '선호 브랜드 없음',
        iconImageUrl: '',
        displayOrder: -1,
      },
      ...data,
    ],
  });
};

import { CommonResponseType } from '@/shared/api/types';

export interface Brand {
  brandId: string;
  name: string;
  iconImageUrl: string;
  displayOrder: number;
}

export interface BrandsResponse extends CommonResponseType {
  data: Brand[];
}

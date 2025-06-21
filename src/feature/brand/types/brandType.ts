export interface Brand {
  brandId: string;
  name: string;
  iconImageUrl: string;
  displayOrder: number;
}

export interface BrandsResponse {
  code: number;
  data: Brand[];
}

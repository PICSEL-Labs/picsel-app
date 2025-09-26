export interface StoreSearchParams {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  page: number;
  size: number;
  userX: number;
  userY: number;
}

export interface StoreData {
  brandId: string;
  brandName: string;
  brandIconImageUrl: string;
  storeId: string;
  storeName: string;
  address: string;
  x: number;
  y: number;
  isFavorite: boolean;
  distance: number;
}

export interface BrandData {
  brandDisplayOrder: number;
  brandIconImageUrl: string;
  brandId: string;
  brandName: string;
}

export interface StoreSearchResult {
  brands: BrandData[];
  content: StoreData[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
}

// 서버 전체 응답 구조
export interface StoreSearchResponse {
  code: number;
  codeMessage: string;
  message: string;
  data: StoreSearchResult;
}

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

// 실제 content 포함한 내부 응답 구조
export interface StoreSearchResult {
  content: StoreData[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
}

export interface Store {
  storeId: string;
  storeName: string;
  brandIconImageUrl: string;
  x: number;
  y: number;
}

// 서버 전체 응답 구조
export interface StoreSearchResponse {
  code: number;
  codeMessage: string;
  message: string;
  data: StoreSearchResult;
}

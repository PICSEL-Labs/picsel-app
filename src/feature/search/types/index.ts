export interface AcSearchParams {
  query: string;
  latitude: number;
  longitude: number;
  radius: number;
}

// 단일 매장 정보
export interface AcStore {
  storeId: string;
  storeName: string;
  address: string;
  distance: number;
  x: number;
  y: number;
}

// 단일 지하철역 정보
export interface AcStation {
  stationName: string;
  lineName: string;
  stationId: number;
  address: string;
  distance: number;
  x: number;
  y: number;
}

// 단일 행정구역 정보
export interface AcAdministrativeDistrict {
  districtId: string;
  districtAddress: string;
  distance: number;
  x: number;
  y: number;
}

export interface AcSearchResult {
  stores: AcStore[];
  stations: AcStation[];
  administrativeDistricts: AcAdministrativeDistrict[];
}

export interface AcSearchResponse {
  code: number;
  codeMessage: string;
  message: string;
  data: AcSearchResult;
}

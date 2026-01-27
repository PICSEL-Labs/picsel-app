export type DateFilterType = 'all' | 'year' | 'month';

// 정렬 타입
export type MyPicselSortType = 'RECENT_DESC' | 'OLDEST_ASC';

// 개별 픽셀 아이템
export interface MyPicselItem {
  picselId: string;
  imagePath: string;
  takenDate: string;
  storeId: string;
  storeName: string;
  brandImagePath: string;
}

// 그룹핑용 Photo 타입
export interface GroupPhoto {
  id: string;
  uri: string;
  date: string;
  storeName: string;
}

// 월별 그룹
export interface MonthGroup {
  month: string;
  photos: GroupPhoto[];
}

// 년도별 그룹
export interface YearGroup {
  year: string;
  months: MonthGroup[];
}

// API 요청 파라미터
export interface MyPicselParams {
  page?: number;
  size?: number;
  sort?: MyPicselSortType;
}

// API 응답 결과 (페이지네이션 포함)
export interface MyPicselResult {
  content: MyPicselItem[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
}

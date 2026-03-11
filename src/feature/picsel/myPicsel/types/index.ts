import { CommonResponseType } from '@/shared/api/types';

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

// 픽셀 삭제 요청
export interface DeletePicselsRequest {
  picselIds: string[];
}

// 상세 페이지 내 픽셀북 정보
export interface PicselDetailBook {
  picselbookId: string;
  bookName: string;
  coverImagePath: string;
}

// 상세 페이지 내 스토어 정보
export interface PicselDetailStore {
  storeId: string;
  storeName: string;
}

// 상세 페이지 내 개별 사진 아이템
export interface PicselDetailPhoto {
  imagePath: string;
  displayOrder: number;
}

// 픽셀 게시글 상세 조회 API 응답
export interface PicselDetailResponse {
  picselId: string;
  picselbook: PicselDetailBook;
  representativeImagePath: string;
  title: string;
  content: string;
  takenDate: string;
  store: PicselDetailStore;
  photos: PicselDetailPhoto[];
}

export interface getPicselDetailResponse extends CommonResponseType {
  data: PicselDetailResponse;
}

export interface MovePicselsRequest {
  targetPicselbookId: string;
  picselIds: string[];
}

export interface MovePicselsResponse extends CommonResponseType {
  data: null;
}

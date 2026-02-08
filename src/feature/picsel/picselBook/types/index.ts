import { CommonResponseType } from '@/shared/api/types';

// 정렬 타입 (API 명세 기준)
export type PicselBookSortType =
  | 'RECENT_CREATED_DESC'
  | 'PHOTO_ADDED_DESC'
  | 'PHOTO_COUNT_DESC';

export type PicselBookEditType = 'editName' | 'editCover';

// API 요청 파라미터
export interface PicselBookParams {
  page?: number;
  size?: number;
  sort?: PicselBookSortType;
}

// 개별 픽셀북 아이템
export interface PicselBookItem {
  picselbookId: string;
  bookName: string;
  coverImagePath: string;
  displayOrder: number;
  lastPicselAddedAt: string | null;
  photoCount: number;
  createdAt: string;
}

// 픽셀북 폴더 정렬 타입
export type PicselBookFolderSortType = 'RECENT_DESC' | 'OLDEST_ASC';

// 픽셀북 폴더 API 요청 파라미터
export interface PicselBookFolderParams {
  picselbookId: string;
  page?: number;
  size?: number;
  sortType?: PicselBookFolderSortType;
}

// 픽셀북 내 픽셀 아이템
export interface PicselBookPicselItem {
  picselId: string;
  representativeImagePath: string;
  title: string;
  contentPreview: string;
  takenDate: string;
  storeId: string;
  storeName: string;
  brandImagePath: string;
}

// 픽셀북 폴더 API 응답 (페이지네이션)
export interface PicselBookFolderResult {
  content: PicselBookPicselItem[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
}

// 픽셀북 삭제 요청
export interface DeletePicselBooksRequest {
  picselbookIds: string[];
}

// 픽셀북 생성 요청
export interface CreatePicselBookRequest {
  bookName: string;
  coverImagePath: string;
}

// 픽셀북 생성 응답
export interface CreatePicselbookResponse extends CommonResponseType {
  data: PicselBookItem;
}

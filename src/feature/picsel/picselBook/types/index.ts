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
  picselBookId: string;
  name: string;
  photoCount: number;
  coverImagePath?: string;
  createdAt: string;
  lastPhotoAddedAt: string;
}

// API 응답 (페이지네이션)
export interface PicselBookResult {
  content: PicselBookItem[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
}

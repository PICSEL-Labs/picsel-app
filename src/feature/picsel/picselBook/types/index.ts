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

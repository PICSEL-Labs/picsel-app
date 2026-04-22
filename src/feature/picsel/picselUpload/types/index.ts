import { PlaceType } from '@/feature/picsel/shared/types';
import { CommonResponseType } from '@/shared/api/types';

// 픽셀 추가 요청
export interface PicselUploadRequest {
  picselId: string;
  picselbookId: string;
  placeType: PlaceType;
  placeId: string;
  takenDate: string;
  title: string;
  content: string;
  imagePaths: string[];
}

// 픽셀 추가 응답
export interface PicselUploadResult {
  picselId: string;
  picselbookId: string;
  representativeImagePath: string;
  createdAt: string;
}

export interface PicselUploadResponse extends CommonResponseType {
  data: PicselUploadResult;
}

// 픽셀 드래프트 생성 응답 Data
export interface CreatePicselDraftData {
  draftUuid: string;
}

// 픽셀 드래프트 생성 응답
export interface CreatePicselDraftResponse extends CommonResponseType {
  data: CreatePicselDraftData;
}
